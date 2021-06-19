#!/bin/bash

echo '*** Initial ffmpeg start'

# https://github.com/iizukanao/picam/issues/113#issuecomment-787083762
while true; do
  if ! pgrep ffmpeg > /dev/null ; then
    # ffmpeg processes were killed
    echo '*** Restarting ffmpeg...'
    sleep 2
    # Start processes again
    ffmpeg -i tcp://av_streaming_ffmpeg:8181?listen -c:v copy -c:a aac -strict -2 -ar 44100 -ab 40000 -rw_timeout 5000000  -f flv $RTMP_URL/$STREAM_KEY?psk=$STREAM_SECRET_KEY
  fi
  sleep 5
done
