modprobe ifb
ip link set dev ifb0 up
tc qdisc add dev enp0s8 ingress

#tc filter add dev $1 parent ffff: protocol ip u32 match u32 0 0 flowid 1:1 action mirred egress redirect dev ifb0
tc filter add dev enp0s8 parent ffff: protocol ip u32 match ip dst 238.1.1.100 flowid 1:1 action mirred egress redirect dev ifb0

ip link set dev ifb1 up
tc filter add dev enp0s8 parent ffff: protocol ip u32 match ip dst 192.168.46.101/32 flowid 1:2 action mirred egress redirect dev ifb1
