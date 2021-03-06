import datetime
import functools
import logging
import os
import uuid

from typing import Dict, Callable

import dateutil.parser

from flask import Flask, request, abort

from pymongo import MongoClient

# Helper functions
def parse_request(request, keys: Dict[str, Callable] = None):

    request_json = request.get_json()

    output = {
        "hive_id": uuid.UUID(request_json["hive_id"]),
        "hive_time_utc": dateutil.parser.parse(request_json["hive_time_utc"]),
        "server_time_utc": datetime.datetime.utcnow(),
    }

    # Handle any further provided keys using the given callable as a parser
    if keys:
        for key, parser in keys.items():
            output[key] = parser(request_json[key])

    return output


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
@app.route("/", methods=["GET"])
def home():
    return "<html><body><h1>🐝</h1><body></html>"


@app.route("/heartbeat", methods=["POST"])
@authenticate
def heartbeat():

    db.heartbeat.insert_one(parse_request(request))

    return "Ok"


@app.route("/environment", methods=["POST"])
@authenticate
def environment():

    db.environment.insert_one(
        parse_request(request, keys={"temperature_c": float, "humidity_pc": float})
    )

    return "Ok"


@app.route("/audio", methods=["POST"])
@authenticate
def audio():

    db.audio.insert_one(
        parse_request(
            request,
            keys={
                "hive_start_utc": dateutil.parser.parse,
                "hive_end_utc": dateutil.parser.parse,
                "duration_ms": int,
                "audio_id": uuid.UUID,
                "url": str,
            },
        )
    )

    return "Ok"
