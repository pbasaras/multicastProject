#!/bin/sh
process_ids=$(ps aux |  grep ffmpeg | awk '{print $2}')
echo $process_ids

for i in "${process_ids}"
do
   #echo "kiling" $i 2>/dev/null
   kill -9 $i 2>/dev/null
done

process_ids2=$(ps aux |  grep ffserver | awk '{print $2}')
echo $process_ids2

for i in "${process_ids2}"
do
   #echo "kiling" $i 2>/dev/null
   kill -9 $i 2>/dev/null
done

process_ids3=$(ps aux |  grep MaggotProxy | awk '{print $2}')
echo $process_ids3

for i in "${process_ids3}"
do
   #echo "kiling" $i 2>/dev/null
   kill -9 $i 2>/dev/null
done

ffserver -f live_stream & #2>/dev/null

sleep 1

/home/porxy/Desktop/proxy/nokia_demo_done_all_21_5/maggot/MaggotProxy/cmake-build-release/MaggotProxy 1 &
/home/porxy/Desktop/proxy/nokia_demo_done_all_21_5/maggot/MaggotProxy/cmake-build-release/MaggotProxy 0
