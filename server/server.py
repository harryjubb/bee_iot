import datetime
import functools
import logging
import os
import uuid

import dateutil.parser

from flask import Flask, request, abort

from pymongo import MongoClient

# Helper functions
def parse_shared_info(request):

    request_json = request.get_json()

    hive_id = uuid.UUID(request_json["hive_id"])
    hive_time_utc = dateutil.parser.parse(request_json["hive_time_utc"])

    return {
        "hive_id": hive_id,
        "hive_time_utc": hive_time_utc,
        "server_time_utc": datetime.datetime.utcnow(),
    }


# App initialisation
app = Flask(__name__)

# Authentication settings
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


# Database
client = MongoClient("mongodb://mongo:27017")
db = client.bees

# Routes
@app.route("/", methods=["POST"])
@authenticate
def hello_world():
    return "Hello World"


@app.route("/heartbeat", methods=["POST"])
@authenticate
def heartbeat():

    db.heartbeat.insert_one(parse_shared_info(request))

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
