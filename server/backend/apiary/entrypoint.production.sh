#!/bin/sh

set -e

python manage.py migrate
python manage.py collectstatic --noinput

# Set up a superuser if one doesn't already exist
echo "Adding a preconfigured superuser if one doesn't exist"
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('$APIARY_SUPERUSER_USERNAME', '', '$APIARY_SUPERUSER_PASSWORD') if not User.objects.filter(username='$APIARY_SUPERUSER_USERNAME').count() else 1" | python manage.py shell

echo "Running in production with gunicorn"
PYTHONUNBUFFERED=TRUE gunicorn --workers="$APIARY_NUM_GUNICORN_WORKERS" -b 0.0.0.0:8000 'apiary.wsgi' --log-level debug