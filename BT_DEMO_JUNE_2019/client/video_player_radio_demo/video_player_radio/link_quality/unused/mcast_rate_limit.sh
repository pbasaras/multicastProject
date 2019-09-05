#!/bin/sh
tc qdisc add dev ifb0 root tbf rate 8mbit burst 32kbit latency 200ms 2>/dev/null
printf "Multicast rate limited at 8Mbps\n"
