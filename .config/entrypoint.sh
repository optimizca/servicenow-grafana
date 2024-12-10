#!/bin/sh

if [ "${DEV}" = "false" ]; then
    echo "Starting in test mode"
    exec /run.sh
fi

echo "Starting in development mode"

# Find supervisord binary
SUPERVISORD=$(which supervisord)

if [ -z "$SUPERVISORD" ]; then
    echo "ERROR: supervisord not found. Ensure it's installed correctly."
    exit 1
fi

if grep -i -q alpine /etc/issue; then
    echo "Detected Alpine base image"
    exec "$SUPERVISORD" -c /etc/supervisord.conf
elif grep -i -q ubuntu /etc/issue; then
    echo "Detected Ubuntu base image"
    exec "$SUPERVISORD" -c /etc/supervisor/supervisord.conf
else
    echo 'ERROR: Unsupported base image'
    exit 1
fi
