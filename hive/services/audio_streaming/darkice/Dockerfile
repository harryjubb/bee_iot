FROM ubuntu:18.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    darkice

COPY darkice.cfg /etc/

ENTRYPOINT [ "darkice" ]
