#!/bin/sh

set -e

# Allow this service to be toggled on / off
if [ "$HIVE_CONNECTIVITY_CHECKING_ENABLED" != "true" ] ; then
    while true; do
        echo '*** Connectivity checking is disabled.'
        echo '*** Set the environment variable HIVE_CONNECTIVITY_CHECKING_ENABLED=true to enable this service.'
        sleep 86400
    done
fi

python -u connectivity.py
