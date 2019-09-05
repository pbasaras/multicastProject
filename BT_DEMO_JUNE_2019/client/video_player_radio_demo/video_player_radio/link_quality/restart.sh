#!/bin/sh
tc qdisc del dev ifb0 root 2>/dev/null
tc qdisc del dev ifb1 root 2>/dev/null
tc qdisc del dev ifb2 root 2>/dev/null
printf "Interfaces reseted!\n"
