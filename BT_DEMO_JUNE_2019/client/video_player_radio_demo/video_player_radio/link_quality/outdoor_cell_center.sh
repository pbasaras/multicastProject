#!/bin/sh
tc qdisc del dev ifb0 root 2>/dev/null # benchmark mcast 5g
tc qdisc del dev ifb2 root 2>/dev/null # bell mcast 5g

tc qdisc add dev ifb0 root netem loss 1%
tc qdisc add dev ifb2 root netem loss 1%
echo "Adding 1% loss to all multicast traffic."
