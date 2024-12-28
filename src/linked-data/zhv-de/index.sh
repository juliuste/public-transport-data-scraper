#!/usr/bin/env bash
set -e
DIR=$(dirname "$0")
BASE_IRI="https://lod.codefor.de/"
BIN_DIR="$DIR/../.bin"
DATA_DIR="$DIR/data"

echo 'Fetching rmlmapper'
wget -q --show-progress --progress=dot:mega -c -N -O "$BIN_DIR/rmlmapper.jar" https://github.com/RMLio/rmlmapper-java/releases/download/v7.0.0/rmlmapper-7.0.0-r374-all.jar

rm -rf "$DATA_DIR"
mkdir -p "$DATA_DIR"

echo 'Preparing data…'
cp "$DIR/../../../de-zhv.zip" "$DATA_DIR/source.zip"
unzip "$DATA_DIR/source.zip" -d "$DATA_DIR/unzipped"
find "$DATA_DIR/unzipped/" -name "*.csv" -exec mv '{}' "$DATA_DIR/source.csv" \;

pnpx csvtojson --delimiter=";" "$DATA_DIR/source.csv" > "$DATA_DIR/source.json"

echo 'Applying mapping…'
java -jar "$BIN_DIR/rmlmapper.jar" -m "$DIR/mapping.ttl" -s turtle --strict --base-iri "$BASE_IRI" > "$DATA_DIR/output.ttl"

echo 'Compressing output…'
cat "$DATA_DIR/output.ttl" | gzip > "$DATA_DIR/output.ttl.gz"

# echo 'Done.'
