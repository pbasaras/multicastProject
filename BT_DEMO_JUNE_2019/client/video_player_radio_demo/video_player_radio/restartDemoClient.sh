#!/bin/sh
process_ids=$(ps aux |  grep Maggot | awk '{print $2}')
echo $process_ids

for i in "${process_ids}"
do
   #echo "kiling" $i 2>/dev/null
   kill -9 $i 2>/dev/null
done

sleep 1

/home/client/Desktop/client/nokia_demo_done_all_21_5/maggot/MaggotVpnClient/app/src/main/jni/Maggot/cmake-build-release/untitled 192.168.46.1 enp0s8 192.168.56.1 enp0s9 0 &
/home/client/Desktop/client/nokia_demo_done_all_21_5/maggot/MaggotVpnClient/app/src/main/jni/Maggot/cmake-build-release/untitled 192.168.76.1 enp0s3 192.168.56.1 enp0s9 1
