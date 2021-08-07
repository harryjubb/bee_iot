#!/bin/bash

# Symlink tmpfs (RAM mount) to picam
mkdir -p /picam_tmpfs/rec
mkdir -p /picam_tmpfs/hooks
mkdir -p /picam_tmpfs/state
mkdir -p /picam_tmpfs/hls

ln -sfn /picam/archive /picam_tmpfs/rec/archive
ln -sfn /picam_tmpfs/rec /picam/rec
ln -sfn /picam_tmpfs/hooks /picam/hooks
ln -sfn /picam_tmpfs/state /picam/state
ln -sfn /picam_tmpfs/hls /picam/hls

echo '*** Starting ffmpeg in the background'
./ffmpeg -i tcp://127.0.0.1:8181?listen -c:v copy -c:a aac -strict -2 -ar 44100 -ab 40000 -rw_timeout 5000000 -f flv $RTMP_URL/$STREAM_KEY?psk=$STREAM_SECRET_KEY &
# Fudge delay for ffmpeg to spin up before starting picam
sleep 5
echo '*** Starting picam'
./picam --autoex --time --alsadev $ALSA_DEVICE -c $AUDIO_CHANNELS --tcpout tcp://127.0.0.1:8181
