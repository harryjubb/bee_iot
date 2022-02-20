FROM python:3.9.6

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY environment.py entrypoint.sh ./

ENV PYTHONUNBUFFERED 1

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
