import functools
import logging
import os

from flask import Flask, request, abort

app = Flask(__name__)

DEBUG = 1

AUTH_TOKEN = os.environ.get("AUTH_TOKEN", None)

if not AUTH_TOKEN:
    raise ValueError("AUTH_TOKEN environment variable is required")


def authenticate(function):
    @functools.wraps(function)
    def wrapped(*args, **kwargs):
        if (
            not request.headers["Authorization"].startswith("Bearer ")
            or not request.headers["Authorization"][7:] == AUTH_TOKEN
        ):
            abort(401)

        return function(*args, **kwargs)

    return wrapped


@app.route("/", methods=["POST"])
@authenticate
def hello_world():
    return "Hello World"


@app.route("/heartbeat", methods=["POST"])
@authenticate
def heartbeat():

    # TODO: Add record to DB (Harry Jubb, Fri  1 Nov 2019 23:47:47 GMT)

    return "Ok"


@app.route("/temperature", methods=["POST"])
@authenticate
def temperature():

    # TODO: Add record to DB (Harry Jubb, Fri  1 Nov 2019 23:47:47 GMT)

    return "Ok"


@app.route("/humidity", methods=["POST"])
@authenticate
def humidity():

    # TODO: Add record to DB (Harry Jubb, Fri  1 Nov 2019 23:47:47 GMT)

    return "Ok"
