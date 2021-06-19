FROM python:3.9.5-slim-buster
LABEL maintainer="harry.jubb@gmail.com"

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "sh", "entrypoint.sh" ]
