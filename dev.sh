#!/bin/bash

./mvnw "-DskipTests=true" clean install

# TODO: check for build success here.

CAN_I_RUN_SUDO=$(sudo -n uptime 2>&1|grep -E "required|load"|wc -l)
if [ ${CAN_I_RUN_SUDO} -gt 0 ]
then
    sudo docker-compose -f docker/docker-compose.yaml build && sudo docker-compose -f docker/docker-compose.yaml up -d
else
    docker-compose -f docker/docker-compose.yaml build && docker-compose -f docker/docker-compose.yaml up -d
fi

if [ $? -ne 0 ]; then
    echo "Docker Build failed, frontend not started"
    exit 1
fi

# TODO: only start frontend if build and up worked
cd frontend
npm install
npm run start
cd ..

CAN_I_RUN_SUDO=$(sudo -n uptime 2>&1|grep -E "required|load"|wc -l)
if [ ${CAN_I_RUN_SUDO} -gt 0 ]
then
    sudo docker-compose -f docker/docker-compose.yaml down
else
    docker-compose -f docker/docker-compose.yaml down
fi
