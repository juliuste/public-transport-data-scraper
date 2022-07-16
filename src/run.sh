#!/usr/bin/env bash
set -e

if [ -z ${FILE_NAME+x} ]; then echo "missing env.FILE_NAME"; exit 1; fi
if [ -z ${MINIMUM_SIZE_MB+x} ]; then echo "missing env.MINIMUM_SIZE_MB"; exit 1; fi

DIRECTORY=$(dirname "$0")
FILE_PATH="$DIRECTORY/../$FILE_NAME"
MINIMUM_SIZE_BYTES=$((1024 * 1024 * $MINIMUM_SIZE_MB))

if [[ $DATASET == "IL_GTFS" ]]; then
	curl --output $FILE_PATH 'ftp://gtfs.mot.gov.il/israel-public-transportation.zip'
else
	node $DIRECTORY/fetch.js > $FILE_PATH;
fi

if [ $(wc -c $FILE_PATH | awk '{print $1}') -lt $MINIMUM_SIZE_BYTES ]; then (echo 'Unexpected file size, seems to small.'; exit 1;) fi
