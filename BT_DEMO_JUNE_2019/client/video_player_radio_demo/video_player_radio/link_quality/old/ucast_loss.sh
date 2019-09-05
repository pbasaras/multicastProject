#!/bin/sh
tc qdisc add dev ifb1 root netem loss 1% 2>/dev/null
echo "Added 1% loss to unicast link"
