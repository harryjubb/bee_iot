"""
Flashes a status LED to show power / network connectivity to the hive
"""

import functools
import logging
from queue import Queue
from threading import Thread
import queue
import sys
import time

import requests
import RPi.GPIO as GPIO

stdout_handler = logging.StreamHandler(sys.stdout)
handlers = [stdout_handler]

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s",
    handlers=handlers,
)

logger = logging.getLogger("connectivity")

session = requests.Session()

session.request = functools.partial(session.request, timeout=15)

PIN = 12

# GPIO.setwarnings(False)  # Ignore warnings
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(PIN, GPIO.OUT, initial=GPIO.LOW)

# def set_led_solid():
#     GPIO.output(PIN, GPIO.HIGH)

# def blink_led(seconds_on=1, seconds_off=1):
#     while 1:
#         GPIO.output(PIN, GPIO.HIGH)
#         time.sleep(seconds_on)
#         GPIO.output(PIN, GPIO.LOW)
#         time.sleep(seconds_off)

def led(queue):

    seconds_on = 1
    seconds_off = 0

    while 1:

        message = None

        try:
            message = queue.get(False)
            logger.info("Thread got queue message: %s", message)
        except queue.Empty:
            pass

        if message:
            seconds_on, seconds_off = message

        GPIO.output(PIN, GPIO.HIGH)
        time.sleep(seconds_on)
        GPIO.output(PIN, GPIO.LOW)
        time.sleep(seconds_off)


queue = Queue()
queue.put([1, 0])
thread = Thread(target=led, args=(queue,))
thread.start()

while 1:

    logger.info("Connectivity check loop")

    have_internet = True
    # have_local_network = False

    # Internet connectivity check
    response = session.get("https://google.com")

    try:
        response.raise_for_status()
    except Exception as error:
        logger.warn("Raised for status")
        have_internet = False

    # TODO: Local network connectivity check

    if have_internet:
        logger.info("Have internet, putting 5,0 on queue")
        # GPIO.output(PIN, GPIO.HIGH)
        # Fix LED solid
        queue.put([5, 0])

    # elif have_local_network:
    #     ...

    #     # TODO: Blink every 5 seconds

    else:
        # Blink every second for 60 seconds then check again
        logger.warn("No internet, 1,1 on queue")
        queue.put([1, 1])

    logger.info("Sleeping")
    time.sleep(15)


