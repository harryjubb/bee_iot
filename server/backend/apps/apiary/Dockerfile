FROM python:3.8.2
LABEL maintainer="harry.jubb@gmail.com"

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app/

ENTRYPOINT [ "sh", "entrypoint.sh" ]