#!/bin/sh

set -e

# Allow this service to be toggled on / off
if [ "$HIVE_ENVIRONMENT_ENABLED" != "true" ] ; then
    while true; do
        echo '*** Environment sensing is disabled.'
        echo '*** Set the environment variable HIVE_ENVIRONMENT_ENABLED=true to enable this service.'
        sleep 86400
    done
fi

python -u environment.py
