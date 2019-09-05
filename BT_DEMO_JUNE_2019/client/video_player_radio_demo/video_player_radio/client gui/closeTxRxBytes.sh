#!/bin/sh
process_ids=$(ps aux |  grep getTxRxBytes | awk '{print $2}')
echo $process_ids

for i in "${process_ids}"
do
   #echo "kiling" $i 2>/dev/null
   kill -9 $i 2>/dev/null
done
