#!/bin/sh

set -e

python manage.py migrate

if [ "$APIARY_ENVIRONMENT" = 'production' ]
then
    python manage.py collectstatic --noinput
fi

# Set up a superuser if one doesn't already exist
if [ -z "$APIARY_SUPERUSER_USERNAME" ] || [ -z "$APIARY_SUPERUSER_PASSWORD" ]
then
    echo "Skipping preconfigured superuser creation"
else
    echo "Creating a preconfigured superuser user"
    python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='$APIARY_SUPERUSER_USERNAME').count():
    User.objects.create_superuser('$APIARY_SUPERUSER_USERNAME', '', '$APIARY_SUPERUSER_PASSWORD')
EOF
fi

if [ "$APIARY_ENVIRONMENT" = 'development' ]
then
    echo "Running in development with runserver"
    python manage.py runserver 0.0.0.0:8000
elif [ "$APIARY_ENVIRONMENT" = 'production' ]
then
    echo "Running in production with gunicorn"
    PYTHONUNBUFFERED=TRUE gunicorn --workers="${APIARY_NUM_GUNICORN_WORKERS:-2}" -b 0.0.0.0:8000 'apiary.wsgi' --log-level debug
else
    echo "Incorrect APIARY_ENVIRONMENT setting"
    exit 1
fi
