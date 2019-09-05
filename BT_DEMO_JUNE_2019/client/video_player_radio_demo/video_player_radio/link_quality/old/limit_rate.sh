tc qdisc add dev ifb0 root tbf rate $1mbit burst 32kbit latency 100ms
