#!/bin/bash

set -e

export STREAM_SECRET_KEY
envsubst '$STREAM_SECRET_KEY' < /templates/nginx.conf.template > /etc/nginx/nginx.conf

mkdir -p /hlstmp/hls
chmod -R 777 /hlstmp/hls

nginx -g 'daemon off;'
