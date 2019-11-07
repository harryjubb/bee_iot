#!/bin/sh

set -e

# Development server
# FLASK_APP=server.py python -m flask run --host=0.0.0.0

# Production gunicorn server
gunicorn -b 0.0.0.0:5000 -w ${NUM_GUNICORN_WORKERS:-2} -k sync server:app
