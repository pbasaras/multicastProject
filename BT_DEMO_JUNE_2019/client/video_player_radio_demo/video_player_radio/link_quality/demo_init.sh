#!/bin/sh
./remove_ingress_filters.sh
./add_ingress_filters.sh
./restart.sh
printf "Initialization complete.\n"

