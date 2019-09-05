#!/bin/sh
tc qdisc del dev ifb0 root 2>/dev/null # benchmark mcast 5g
tc qdisc del dev ifb2 root 2>/dev/null # bell mcast 5g

tc qdisc add dev ifb0 root tbf rate 8mbit burst 32kbit latency 200ms
tc qdisc add dev ifb1 root tbf rate 2mbit burst 32kbit latency 200ms
tc qdisc add dev ifb2 root tbf rate 8mbit burst 32kbit latency 200ms
echo "Multicast 5G rate limited to 8Mbps."
echo "Unicast/Repair 5G rate limited to 2Mbps."
