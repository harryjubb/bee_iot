"""
Flashes a status LED to show power / network connectivity to the hive
"""

import functools
import logging
from multiprocessing import Process, Queue
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

GPIO.setwarnings(False)  # Ignore warnings
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
        except queue.Empty:
            pass

        if message:
            seconds_on, seconds_off = message

        GPIO.output(PIN, GPIO.HIGH)
        time.sleep(seconds_on)
        GPIO.output(PIN, GPIO.LOW)
        time.sleep(seconds_off)


queue = Queue()
process = Process(target=led, args=(queue,))

while 1:

    have_internet = True
    # have_local_network = False

    # Internet connectivity check
    response = session.get("https://google.com")

    try:
        response.raise_for_status()
    except Exception as error:
        have_internet = False

    # TODO: Local network connectivity check

    if have_internet:
        # Fix LED solid
        queue.put([5, 0])

    # elif have_local_network:
    #     ...

    #     # TODO: Blink every 5 seconds

    else:
        # Blink every second for 60 seconds then check again
        queue.put([1, 1])

    time.sleep(60)


