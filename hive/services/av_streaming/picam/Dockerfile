FROM raspbian/stretch

WORKDIR /download

RUN wget https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-armhf-static.tar.xz
RUN tar xvf ffmpeg-git-armhf-static.tar.xz && \
  mkdir -p ffmpeg && mv ffmpeg-git*/ffmpeg ffmpeg/

# Test ffmpeg
# Build will fail if ffmpeg cannot run
RUN ./ffmpeg/ffmpeg --help

RUN wget https://github.com/iizukanao/picam/releases/download/v1.4.11/picam-1.4.11-binary.tar.xz
RUN tar xvf picam-1.4.11-binary.tar.xz

RUN apt-get update -y && apt-get install -y \
  libharfbuzz0b libfontconfig1 libgles2-mesa-dev \
  wget xz-utils libasound2 libasound-dev curl nscd psmisc

# Copy Rasbian specific libraries: See copy_libs.sh
COPY lib /opt/vc/lib

WORKDIR /picam

RUN cp /download/picam-1.4.11-binary/picam /picam/
RUN cp /download/ffmpeg/ffmpeg .
RUN mkdir archive

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/vc/lib

# Test picam
# Build will fail if picam cannot run
RUN ./picam --help

# Test ffmpeg
# Build will fail if ffmpeg cannot run
RUN ./ffmpeg --help

COPY entrypoint.sh .

COPY asoundrc /root/.asoundrc

ENTRYPOINT ["sh", "entrypoint.sh"]
