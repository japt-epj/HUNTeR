#!/bin/bash

# check for sudo
docker-compose -f docker/docker-compose.yaml build
docker-compose -f docker/docker-compose.yaml up -d

# only start frontend if build and up worked
#cd frontend
#npm run start
