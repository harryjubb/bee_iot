#!/bin/bash

set -e

export STREAM_SECRET_KEY
envsubst '$STREAM_SECRET_KEY' < /templates/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g 'daemon off;'