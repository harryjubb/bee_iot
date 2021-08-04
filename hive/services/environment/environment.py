import time
from datetime import datetime

import bme680
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from pydantic import BaseSettings


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
try:
    sensor = bme680.BME680(bme680.I2C_ADDR_PRIMARY)
except (RuntimeError, IOError):
    sensor = bme680.BME680(bme680.I2C_ADDR_SECONDARY)

print("Calibration data:")
for name in dir(sensor.calibration_data):

    if not name.startswith("_"):
        value = getattr(sensor.calibration_data, name)

        if isinstance(value, int):
            print("{}: {}".format(name, value))

# These oversampling settings can be tweaked to
# change the balance between accuracy and noise in
# the data.

sensor.set_humidity_oversample(bme680.OS_2X)
sensor.set_pressure_oversample(bme680.OS_4X)
sensor.set_temperature_oversample(bme680.OS_8X)
sensor.set_filter(bme680.FILTER_SIZE_3)
sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)

print("\n\nInitial reading:")
for name in dir(sensor.data):
    value = getattr(sensor.data, name)

    if not name.startswith("_"):
        print("{}: {}".format(name, value))

sensor.set_gas_heater_temperature(320)
sensor.set_gas_heater_duration(150)
sensor.select_gas_heater_profile(0)

# Sensor reading loop
try:
    while 1:

        # Get raw sensor readings
        print("Attempting to send sensor readings")
        if sensor.get_sensor_data():

            readings = ["temperature", "pressure", "humidity"] + (
                ["gas_resistance"] if sensor.data.heat_stable else []
            )

            for reading in readings:
                value = getattr(sensor.data, reading)

                print(f"{reading}: {value}")

                # Send sensor reading to InfluxDB
                point = (
                    Point("environment")
                    .tag("hive", settings.hive_name)
                    .field(reading, value)
                    .time(datetime.utcnow(), WritePrecision.S)
                )

                write_api.write(settings.bucket, settings.org, point)

            print("Readings sent")

        time.sleep(30)

except KeyboardInterrupt:
    pass
