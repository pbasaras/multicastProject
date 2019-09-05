#!/bin/sh
tc qdisc del dev enp0s3 ingress 2>/dev/null
tc qdisc del dev enp0s8 ingress 2>/dev/null
printf "Ingress Filters removed.\n"
