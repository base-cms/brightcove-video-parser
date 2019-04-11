#!/bin/bash
set -e

IMAGE=basecms/brightcove-video-parser:$1
yarn global add @endeavorb2b/rancher2cli
r2 dl basecms-service brightcove-video-parser $IMAGE --namespace=imports
