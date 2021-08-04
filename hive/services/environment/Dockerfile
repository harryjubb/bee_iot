FROM python:3.9.6-alpine3.14

RUN mkdir /app
WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh build-base

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY environment.py entrypoint.sh ./

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
