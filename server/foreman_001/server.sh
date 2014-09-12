#! /bin/bash

## Wrapper around our server launch to investigate/change signals

echo "Hello from wrapper bash script ${$}..."

# trap TERM and change it to QUIT
trap 'echo "${$} received SIGTERM, forwarding to $PID..."; kill -SIGTERM $PID' TERM
trap 'echo "${$} received SIGINT, forwarding to $PID..."; kill -SIGINT $PID;' INT

# program to run
./webserver.js &

# capture PID and wait
PID=$!
echo "wrapper bash script ${$} waiting for $PID"
wait
RET=$?
echo "wrapper bash script ${$} exiting with $RET"
exit $RET
