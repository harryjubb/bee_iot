"""
Django settings for apiary project.

Generated by 'django-admin startproject' using Django 3.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import environ

env = environ.Env()

DEVELOPMENT_MODE = env.bool("APIARY_DEVELOPMENT_MODE")

# Domain
DOMAIN = env.str("APIARY_API_DOMAIN")
FRONTEND_DOMAIN = env.str("APIARY_FRONTEND_DOMAIN")

MEDIA_ROOT = env.str("APIARY_MEDIA_ROOT", "/media")
MEDIA_URL = env.str("APIARY_MEDIA_URL", "/media/")

STATIC_ROOT = env.str("APIARY_STATIC_ROOT", "/static")
STATIC_URL = env.str("APIARY_STATIC_URL", "/static/")


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("APIARY_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
if DEVELOPMENT_MODE:
    print("DEVELOPMENT_MODE is on")
    DEBUG = True
else:
    DEBUG = False

SUBDOMAINS = env.list("SUBDOMAINS", [])
URL = env.str("URL")

if DEVELOPMENT_MODE:
    ALLOWED_HOSTS = ["*"]
else:
    ALLOWED_HOSTS = [f"{subdomain}.{URL}" for subdomain in SUBDOMAINS]

if DEVELOPMENT_MODE:
    CORS_ORIGIN_ALLOW_ALL = True
else:
    CORS_ORIGIN_WHITELIST = env.list("APIARY_CORS_ORIGIN_WHITELIST", [])

if not DEVELOPMENT_MODE:
    # Setup support for proxy headers
    USE_X_FORWARDED_HOST = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Application definition

INSTALLED_APPS = [
    "apiary.apps.hive",
    "apiary.apps.sponsor",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "graphene_django",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "apiary.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "apiary.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "HOST": "postgres",
        "PASSWORD": env.str("POSTGRES_PASSWORD"),
        "PORT": 5432,
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Graphene
GRAPHENE = {"SCHEMA": "apiary.schema.schema"}
