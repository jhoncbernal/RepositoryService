#!/bin/bash
GREEN="\e[32m"
ENDCOLOR="\e[0m"

echo "${GREEN}1. ===================> Building...${ENDCOLOR}"
docker-compose build
echo "${GREEN}2. ===================> Starting...${ENDCOLOR}"
docker-compose up -d
echo "${GREEN}3. ===================> Logs...${ENDCOLOR}"
docker-compose logs
echo "${GREEN}4. ===================> Cleaning...${ENDCOLOR}"
sleep 4
docker image prune -f
echo "${GREEN}5. ===================> Finished${ENDCOLOR}"