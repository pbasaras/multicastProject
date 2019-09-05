#!/bin/sh
modprobe ifb numifbs=3

tc qdisc add dev enp0s3 ingress 2>/dev/null # vanilla multicast 5g
tc qdisc add dev enp0s9 ingress 2>/dev/null # bell multicast 5g

ip link set dev ifb0 up	# vanilla multicast 5g
ip link set dev ifb1 up # vanilla unicast 5g (repair)
ip link set dev ifb2 up # bell multicast 5g

tc filter add dev enp0s3 parent ffff: protocol ip u32 match ip dst 238.1.1.100 flowid 1:1 action mirred egress redirect dev ifb0 #2>/dev/null
tc filter add dev enp0s3 parent ffff: protocol ip u32 match ip dst 192.168.76.104/32 flowid 1:2 action mirred egress redirect dev ifb1 #2>/dev/null
tc filter add dev enp0s9 parent ffff: protocol ip u32 match u32 0 0 flowid 1:1 action mirred egress redirect dev ifb2 #2>/dev/null

printf "Ingress Filters Added.\n"
