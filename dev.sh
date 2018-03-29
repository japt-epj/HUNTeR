#!/bin/bash

docker-compose -f docker/docker-compose.yaml build
docker-compose -f docker/docker-compose.yaml up -d
#cd frontend
#npm run start
