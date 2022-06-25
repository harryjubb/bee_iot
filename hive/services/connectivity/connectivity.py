"""
Flashes a status LED to show power / network connectivity to the hive
"""

import functools
import logging
import os
from queue import Queue
from threading import Thread
import queue
import sys
import time

import requests
import RPi.GPIO as GPIO

CONNECTION_CHECK_URL = "https://google.com"

stdout_handler = logging.StreamHandler(sys.stdout)
handlers = [stdout_handler]

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=handlers,
)

logger = logging.getLogger("connectivity")

session = requests.Session()

session.request = functools.partial(session.request, timeout=(3.05, 15))

PIN = int(os.environ.get("HIVE_LED_PIN", 16))

# GPIO.setwarnings(False)  # Ignore warnings
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(PIN, GPIO.OUT, initial=GPIO.LOW)

def led(thread_queue):

    seconds_on = 1
    seconds_off = 0

    while 1:

        message = None

        try:
            message = thread_queue.get(block=False)
            logger.info("Thread got queue message: %s", message)
        except queue.Empty:
            pass

        if message:
            seconds_on, seconds_off = message

        GPIO.output(PIN, GPIO.HIGH)
        time.sleep(seconds_on)
        GPIO.output(PIN, GPIO.LOW)
        time.sleep(seconds_off)


thread_queue = Queue()
thread_queue.put([1, 0])
thread = Thread(target=led, args=(thread_queue,))
thread.start()

while 1:

    logger.info("Connectivity check loop")

    have_internet = True

    # Internet connectivity check
    try:
        response = session.get(CONNECTION_CHECK_URL)
    except Exception as error:
        logger.warn("Unable to make a request")
        have_internet = False

    try:
        response.raise_for_status()
    except Exception as error:
        logger.warn("Raised for status")

    if have_internet:
        logger.info("Have internet, putting 5,0 on queue")

        # Fix LED solid
        thread_queue.put([5, 0])

    else:
        # Blink every second for 60 seconds then check again
        logger.warn("No internet, on queue")
        thread_queue.put([0.5, 0.5])

    logger.info("Sleeping")
    time.sleep(15)


