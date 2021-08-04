FROM python:3.9.6

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY environment.py entrypoint.sh ./

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
