FROM python:3.8.0-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY environment.py entrypoint.sh ./

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
