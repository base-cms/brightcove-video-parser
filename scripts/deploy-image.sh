#!/bin/bash
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -q -t "brightcove-video-parser:$1" .

docker tag "brightcove-video-parser:$1" "basecms/brightcove-video-parser:$1"
docker push "basecms/brightcove-video-parser:$1"
docker image rm "brightcove-video-parser:$1"
