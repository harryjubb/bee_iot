import datetime
import functools
import logging
import os
import uuid

import dateutil.parser

from flask import Flask, request, abort

from pymongo import MongoClient

app = Flask(__name__)
DEBUG = 1

AUTH_TOKEN = os.environ.get("AUTH_TOKEN", None)

if not AUTH_TOKEN:
    raise ValueError("AUTH_TOKEN environment variable is required")

client = MongoClient("mongodb://mongo:27017")
db = client.bees


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

    hive_id = uuid.UUID(request.get_json()["hive_id"])
    pi_time = dateutil.parser.parse(request.get_json()["pi_time"])

    db.heartbeat.insert_one(
        {
            "hive_id": hive_id,
            "pi_time": pi_time,
            "server_time_utc": datetime.datetime.utcnow(),
        }
    )

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
