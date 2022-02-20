import logging
import sys
import time
from datetime import datetime, timezone

import bme680
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from pydantic import BaseSettings

stdout_handler = logging.StreamHandler(sys.stdout)
handlers = [stdout_handler]

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=handlers,
)

logger = logging.getLogger("environment")

SENSOR_ADDRESSES = {
    "environment": bme680.I2C_ADDR_PRIMARY,
    "environment_outside": bme680.I2C_ADDR_SECONDARY,
}


class Settings(BaseSettings):
    hive_name: str
    token: str
    org: str
    bucket: str
    url: str

    class Config:
        fields = {
            "token": {"env": "influxdb_api_token"},
            "org": {"env": "influxdb_org"},
            "bucket": {"env": "influxdb_bucket"},
            "url": {"env": "influxdb_url"},
        }


settings = Settings()
client = InfluxDBClient(url=settings.url, token=settings.token)
write_api = client.write_api(write_options=SYNCHRONOUS)

# BME680 setup
# https://github.com/pimoroni/bme680-python/blob/master/examples/read-all.py
sensors = {}

for sensor_name, sensor_address in SENSOR_ADDRESSES.items():
    sensor = None
    try:
        sensor = bme680.BME680(sensor_address)
        sensors[sensor_name] = sensor
    except (RuntimeError, IOError) as error:
        logger.error(
            "Unable to establish sensor %s at address %s: %s",
            sensor_name,
            sensor_address,
            error,
        )
        continue

    logger.info("Calibration data for %s at %s:", sensor_name, sensor_address)
    for name in dir(sensor.calibration_data):

        if not name.startswith("_"):
            value = getattr(sensor.calibration_data, name)

            if isinstance(value, int):
                logger.info("%s, %s", name, value)

    # These oversampling settings can be tweaked to
    # change the balance between accuracy and noise in
    # the data.

    sensor.set_humidity_oversample(bme680.OS_2X)
    sensor.set_pressure_oversample(bme680.OS_4X)
    sensor.set_temperature_oversample(bme680.OS_8X)
    sensor.set_filter(bme680.FILTER_SIZE_3)
    sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)

    logger.info("%s at %s initial reading:", sensor_name, sensor_address)
    for name in dir(sensor.data):
        value = getattr(sensor.data, name)

        if not name.startswith("_"):
            logger.info("%s, %s", name, value)

    sensor.set_gas_heater_temperature(320)
    sensor.set_gas_heater_duration(150)
    sensor.select_gas_heater_profile(0)

# Sensor reading loop
try:
    while 1:

        for sensor_name, sensor in sensors.items():
            # Get raw sensor readings
            logger.info("Attempting to send sensor readings: %s", sensor_name)
            if sensor.get_sensor_data():

                readings = ["temperature", "pressure", "humidity"] + (
                    ["gas_resistance"] if sensor.data.heat_stable else []
                )

                for reading in readings:
                    value = getattr(sensor.data, reading)

                    logger.info("%s: %s", reading, value)

                    # Send sensor reading to InfluxDB
                    point = (
                        Point(sensor_name)
                        .tag("hive", settings.hive_name)
                        .field(reading, value)
                        .time(datetime.now(timezone.utc), WritePrecision.S)
                    )

                    write_api.write(settings.bucket, settings.org, point)

                logger.info("Readings sent (%s)", sensor_name)
            else:
                logger.warning("Unable to get sensor data for %s", sensor_name)

        time.sleep(30)

except KeyboardInterrupt:
    pass
