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

echo '*** Starting ffmpeg in the background'
./ffmpeg -i tcp://127.0.0.1:8181?listen -c:v copy -c:a aac -strict -2 -ar 44100 -ab 40000 -rw_timeout 5000000 -f flv $RTMP_URL/$STREAM_KEY?psk=$STREAM_SECRET_KEY &
# Fudge delay for ffmpeg to spin up before starting picam
sleep 5
echo '*** Starting picam'
./picam --autoex --time --alsadev $ALSA_DEVICE -c $AUDIO_CHANNELS --tcpout tcp://127.0.0.1:8181
