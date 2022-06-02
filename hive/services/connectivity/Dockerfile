FROM python:3.9.6

RUN mkdir /app
WORKDIR /app

RUN apt-get update && \
    apt-get install python-rpi.gpio python3-rpi.gpio \
     && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY connectivity.py entrypoint.sh ./

ENV PYTHONUNBUFFERED 1

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
