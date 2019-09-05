while true; 
do cp /sys/class/net/ifb0/statistics/rx_bytes  interfaces/ifb0_rx_bytes.txt && 
   cp /sys/class/net/ifb1/statistics/rx_bytes  interfaces/ifb1_rx_bytes.txt &&
   cp /sys/class/net/enp0s8/statistics/rx_bytes  interfaces/enp0s8_rx_bytes.txt && 
   cp /sys/class/net/enp0s9/statistics/rx_bytes  interfaces/ifb2_rx_bytes.txt &&
   cp /sys/class/net/enp0s10/statistics/rx_bytes  interfaces/enp0s10_rx_bytes.txt;

sleep 1; 
done

