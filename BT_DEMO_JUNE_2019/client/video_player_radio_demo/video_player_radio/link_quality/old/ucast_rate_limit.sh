#!/bin/sh
tc qdisc add dev ifb1 root tbf rate 2mbit burst 32kbit latency 200ms 2>/dev/null
printf "Unicast rate limited at 2Mbps\n"
