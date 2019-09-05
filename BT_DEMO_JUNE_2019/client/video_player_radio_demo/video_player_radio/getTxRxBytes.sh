#!/bin/bash

INTERVAL="1"  # update interval in seconds
BITS="8"

if [ -z "$1" ]; then
        echo
        echo usage: $0 [network-interface]
        echo
        echo e.g. $0 eth0
        echo
        exit
fi
 
IF=$1

echo "Monitoring interfaces: $1 $2 $3 $4 $5"

while true
do
        R1=`cat /sys/class/net/$1/statistics/rx_bytes`
        T1=`cat /sys/class/net/$1/statistics/tx_bytes`
        K1=`cat /sys/class/net/$2/statistics/rx_bytes`
        L1=`cat /sys/class/net/$2/statistics/tx_bytes`
        M1=`cat /sys/class/net/$3/statistics/rx_bytes`
        N1=`cat /sys/class/net/$3/statistics/tx_bytes`
        O1=`cat /sys/class/net/$4/statistics/rx_bytes`
        P1=`cat /sys/class/net/$4/statistics/tx_bytes`
        W1=`cat /sys/class/net/$5/statistics/rx_bytes`
        Z1=`cat /sys/class/net/$5/statistics/tx_bytes`
        sleep $INTERVAL
        R2=`cat /sys/class/net/$1/statistics/rx_bytes`
        T2=`cat /sys/class/net/$1/statistics/tx_bytes`
        K2=`cat /sys/class/net/$2/statistics/rx_bytes`
        L2=`cat /sys/class/net/$2/statistics/tx_bytes`
        M2=`cat /sys/class/net/$3/statistics/rx_bytes`
        N2=`cat /sys/class/net/$3/statistics/tx_bytes`
        O2=`cat /sys/class/net/$4/statistics/rx_bytes`
        P2=`cat /sys/class/net/$4/statistics/tx_bytes`
        W2=`cat /sys/class/net/$5/statistics/rx_bytes`
        Z2=`cat /sys/class/net/$5/statistics/tx_bytes`

        TBPS1=`expr $T2 - $T1`
        RBPS1=`expr $R2 - $R1`
        TBPS2=`expr $L2 - $L1`
        RBPS2=`expr $K2 - $K1`
	TBPS3=`expr $N2 - $N1`
        RBPS3=`expr $M2 - $M1`
	TBPS4=`expr $P2 - $P1`
        RBPS4=`expr $O2 - $O1`
	TBPS5=`expr $Z2 - $Z1`
        RBPS5=`expr $W2 - $W1`

#	TKBPS1=`expr $BITS \* $TBPS1 / 1000000`
#	RKBPS1=`expr $BITS \* $RBPS1 / 1000000`
#	TKBPS2=`expr $BITS \* $TBPS2 / 1000000`
#	RKBPS2=`expr $BITS \* $RBPS2 / 1000000`
#	TKBPS3=`expr $BITS \* $TBPS3 / 1000000`
#	RKBPS3=`expr $BITS \* $RBPS3 / 1000000`

	TKBPS1=`expr $BITS \* $TBPS1`
	RKBPS1=`expr $BITS \* $RBPS1`
	TKBPS2=`expr $BITS \* $TBPS2`
	RKBPS2=`expr $BITS \* $RBPS2`
	TKBPS3=`expr $BITS \* $TBPS3`
	RKBPS3=`expr $BITS \* $RBPS3`
	TKBPS4=`expr $BITS \* $TBPS4`
	RKBPS4=`expr $BITS \* $RBPS4`
	TKBPS5=`expr $BITS \* $TBPS5`
	RKBPS5=`expr $BITS \* $RBPS5`


	#echo "$1(TX): $TKBPS1 kB/s  $1(RX): $RKBPS1 kB/s   |   $2(TX): $TKBPS2 kB/s  $2(RX): $RKBPS2 kB/s   |   $3(TX): $TKBPS3 kB/s  $3(RX): $RKBPS3 kB/s"
	echo $RKBPS1 > ../interfaces/$1_rx_bytes.txt
	echo $RKBPS2 > ../interfaces/$2_rx_bytes.txt
	echo $RKBPS3 > ../interfaces/$3_rx_bytes.txt
	echo $RKBPS4 > ../interfaces/$4_rx_bytes.txt
	echo $RKBPS5 > ../interfaces/$5_rx_bytes.txt
done

