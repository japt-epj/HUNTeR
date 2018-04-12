#!/bin/bash

# check if target/bla.jar exists in frontend
SPRING_PROFILES_ACTIVE=dev; ./mvnw -f backend/pom.xml "-DskipTests=true" "-Ddeactivate-dev-tools=false" clean install

# TODO: check for build success here.

CAN_I_RUN_SUDO=$(sudo -n uptime 2>&1|grep -E "required|load"|wc -l)
if [ ${CAN_I_RUN_SUDO} -gt 0 ]
then
    sudo docker-compose -f docker/docker-compose.yaml build && sudo docker-compose -f docker/docker-compose.yaml up -d
else
    docker-compose -f docker/docker-compose.yaml build && docker-compose -f docker/docker-compose.yaml up -d
fi

# only start frontend if build and up worked
if [ $? -ne 0 ]; then
    echo "Docker Build failed, frontend not started"
    exit 1
fi

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
