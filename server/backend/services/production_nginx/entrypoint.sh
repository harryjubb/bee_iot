#!/bin/bash

set -e

# default.template must be bind-mounted in currently
export STREAM_SECRET_KEY

# Substitute in select environment variables into nginx conf
envsubst '$STREAM_SECRET_KEY' < /templates/default.template > /config/nginx/site-confs/default

# Resume LE Docker entrypoint
/init