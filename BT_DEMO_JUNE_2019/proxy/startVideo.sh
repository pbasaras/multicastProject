#!/bin/sh
ffmpeg -re -i tearsofsteel_4k.mov -x264opts nal-hrd=cbr:force-cfr=1 -b:v 10000k -minrate 10000k -maxrate 10000k -cpu-used 4 -threads 2  http://127.0.0.1:8090/feed1.ffm #2>/dev/null
