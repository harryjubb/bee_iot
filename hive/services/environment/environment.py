import datetime
import logging
import os
import sys
import time

from urllib.parse import urljoin

import Adafruit_DHT
import requests

sensor = Adafruit_DHT.DHT11
pin = 17

AUTH_TOKEN = os.environ.get("AUTH_TOKEN", None)
SERVER = os.environ.get("SERVER", None)
HIVE_ID = os.environ.get("HIVE_ID", None)

if not AUTH_TOKEN:
    raise ValueError("AUTH_TOKEN environment variable must be set")

if not SERVER:
    raise ValueError("SERVER environment variable must be set")

if not HIVE_ID:
    raise ValueError("HIVE_ID environment variable must be set")

URL = urljoin(SERVER, "environment")

while 1:

    logging.info("Fresh loop")

    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

    logging.info(f"Humidity reading: {humidity}")
    logging.info(f"Temperature reading: {temperature}")
    
    if humidity is None or temperature is None:
        logging.warn("Readings failed, retrying")
        time.sleep(5)
        continue

    logging.info("Posting results")

    # Submit readings
    response = requests.post(
        URL,
        json={
            "hive_id": HIVE_ID,
            "hive_time_utc": datetime.datetime.utcnow().isoformat(),
            "temperature_c": temperature,
            "humidity_pc": humidity
        },
        headers={
            "Authorization": f"Bearer {AUTH_TOKEN}"
        }
    )

    logging.info(f"Response status: {response.status_code}")
    logging.info(f"Response content: {response.content}")

    logging.info("Sleeping")

    time.sleep(60)
