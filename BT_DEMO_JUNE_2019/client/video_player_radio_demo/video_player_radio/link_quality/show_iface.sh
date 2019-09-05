#!/bin/sh
printf "\n** Multicast 5G (benchmark) **\n"
tc qdisc show dev ifb0

printf "\n** Unicast 5G (benchmark) **\n"
tc qdisc show dev ifb1

printf "\n** Multicast 5G (bell) **\n"
tc qdisc show dev ifb2
printf "\n"
