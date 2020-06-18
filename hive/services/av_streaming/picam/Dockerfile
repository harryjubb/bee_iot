FROM raspbian/stretch

WORKDIR /download

RUN wget https://github.com/iizukanao/picam/releases/download/v1.4.7/picam-1.4.7-binary.tar.xz
RUN tar xvf picam-1.4.7-binary.tar.xz

RUN apt-get update -y && apt-get install -y libharfbuzz0b libfontconfig1 libgles2-mesa-dev wget xz-utils libasound2 libasound-dev

# Copy Rasbian specific libraries: See copy_libs.sh
COPY lib /opt/vc/lib

WORKDIR /picam

RUN cp /download/picam-1.4.7-binary/picam /picam/
RUN mkdir archive

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/vc/lib

# Test picam
# Build will fail if picam cannot run
RUN ./picam --help

COPY entrypoint.sh .

ENTRYPOINT ["sh", "entrypoint.sh"]