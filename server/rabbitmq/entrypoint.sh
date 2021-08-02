#!/bin/bash

# Bash implementation of RabbitMQ's password hashing
# https://stackoverflow.com/a/53175209/1108828
function encode_password()
{
    SALT=$(od -A n -t x -N 4 /dev/urandom)
    PASS=$SALT$(echo -n $1 | xxd -ps | tr -d '\n' | tr -d ' ')
    PASS=$(echo -n $PASS | xxd -r -p | sha256sum | head -c 128)
    PASS=$(echo -n $SALT$PASS | xxd -r -p | base64 | tr -d '\n')
    echo $PASS
}

HASHED_PASSWORD=$(encode_password $RABBITMQ_PASSWORD)

# Substitute the hashed password into the built-in definitions file template
sed "s/::::::PASSWORD_HASH::::::/$HASHED_PASSWORD/g" /conf/rabbitmq-definitions.template.json > /conf/rabbitmq-definitions.json

docker-entrypoint.sh rabbitmq-server
