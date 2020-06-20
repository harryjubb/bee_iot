#!/bin/bash

ffmpeg -i tcp://av_streaming_ffmpeg:8181?listen -i /logo/logo.png -filter_complex "overlay=10:10" -c:v copy -c:a aac -strict -2 -ar 44100 -ab 40000 -f flv $RTMP_URL/$STREAM_KEY