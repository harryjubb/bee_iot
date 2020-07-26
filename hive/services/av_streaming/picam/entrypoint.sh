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

./picam --samplerate 44100 --channels 1 --audiobitrate 96000 --videobitrate 4000000 --vfr --avclevel 3.1 --autoex --time --alsadev $ALSA_DEVICE -c $AUDIO_CHANNELS --tcpout tcp://av_streaming_ffmpeg:8181  