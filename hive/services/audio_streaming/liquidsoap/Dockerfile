FROM ubuntu:18.04
# Adapted from https://github.com/infiniteproject/liquidsoap

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    software-properties-common m4 make patch git darcs mercurial \
    libmad0-dev libmp3lame-dev

RUN add-apt-repository ppa:avsm/ppa

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ocaml-nox opam

ENV DEBIAN_FRONTEND noninteractive
ENV PACKAGES "taglib mad lame vorbis cry liquidsoap"

RUN opam init --disable-sandboxing
RUN opam install -y depext
RUN opam depext $PACKAGES && \
    opam install -y $PACKAGES

RUN sudo apt-get clean && \
    sudo rm -fr /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY entrypoint.sh /entrypoint.sh
RUN sudo chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
