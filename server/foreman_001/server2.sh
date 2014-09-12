#!/bin/bash

echo "Hello from bash script ${$}..."

# trap TERM and change to QUIT
trap 'echo "received SIGTERM, killing $PID with SIGQUIT..."; kill -QUIT $PID; exit 3' TERM
trap 'echo "${$} received SIGINT";' INT

# program to run
sleep 10000 &

# capture PID and wait
PID=$!
echo "bash script ${$} waiting for $PID..."
wait
echo "${$} but I can't speak !" > ./out-${$}.txt
echo "bash script ${$} exiting naturally."
exit 1
