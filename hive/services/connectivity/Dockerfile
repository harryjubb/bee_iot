FROM raspbian/stretch

RUN mkdir /app
WORKDIR /app

RUN apt-get update && \
    apt-get install -y python-rpi.gpio python3-rpi.gpio \
     && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY connectivity.py entrypoint.sh ./

ENV PYTHONUNBUFFERED 1

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
