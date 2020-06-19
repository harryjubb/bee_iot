#!/bin/sh

set -e

# Development API server
# FLASK_APP=api.py python -m flask run --host=0.0.0.0

# Production gunicorn API server
gunicorn -b 0.0.0.0:5000 -w ${NUM_GUNICORN_WORKERS:-2} -k sync api:app
