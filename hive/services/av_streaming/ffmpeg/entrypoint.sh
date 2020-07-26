#!/bin/bash

ffmpeg -reconnect 1 -reconnect_at_eof 1 -reconnect_streamed 1 -reconnect_delay_max 2 -i tcp://av_streaming_ffmpeg:8181?listen -c:v copy -c:a aac -strict -2 -ar 44100 -ab 40000 -f flv $RTMP_URL/$STREAM_KEY?psk=$STREAM_SECRET_KEY