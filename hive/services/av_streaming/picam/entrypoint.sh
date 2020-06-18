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

# ./picam --alsadev $ALSA_DEVICE -o /shm/hls
./picam --alsadev $ALSA_DEVICE --tcpout tcp://localhost:8181
# ./picam --alsadev $ALSA_DEVICE -o /shm/hls --tcpout tcp://localhost:8181