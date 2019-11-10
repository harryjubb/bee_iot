#!/bin/bash

eval `opam config env`
liquidsoap   'output.icecast(%mp3,host = "streaming.hilboroughmill.org", port = 80,password="7CB50B33-7A64-4FDB-8604-1E6854DF541C",mount = "liq.mp3", mksafe(input.alsa(device="hw:1,0")))'  
