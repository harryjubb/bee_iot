#!/bin/bash

# Symlink tmpfs (shm / RAM drive) to picam
mkdir -p /shm/rec
mkdir -p /shm/hooks
mkdir -p /shm/state
mkdir -p /shm/hls

ln -sfn /picam/archive /shm/rec/archive
ln -sfn /shm/rec /picam/rec
ln -sfn /shm/hooks /picam/hooks
ln -sfn /shm/state /picam/state
ln -sfn /shm/hls /picam/hls

# https://github.com/iizukanao/picam/issues/113#issuecomment-787083762
while true; do
  if ! pgrep picam > /dev/null ; then
    # ffmpeg processes were killed
    echo '*** Restarting picam...'
    sleep 2
    # Start processes again
    ./picam --autoex --time --alsadev $ALSA_DEVICE -c $AUDIO_CHANNELS --tcpout tcp://av_streaming_ffmpeg:8181
  fi
  sleep 5
done
