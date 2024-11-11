#!/bin/bash

REMOTE_USER="dima"
REMOTE_HOST="130.193.46.175"
REMOTE_DIR="/home/dima/app/"
APP_NAME="gifts-server"
BOT_NAME="gifts-bot"

# Connect and stop running apps
ssh ${REMOTE_USER}@${REMOTE_HOST} << ENDSSH
sudo pm2 stop app/ecosystem.config.cjs || true

rm -rf ${REMOTE_DIR}*
ENDSSH


# Copy server files and client dist
rsync -av --copy-links \
  src \
  .env \
  package.json \
  ecosystem.config.cjs \
  run-bot.sh \
  run-server.sh \
  ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}

ssh ${REMOTE_USER}@${REMOTE_HOST} << ENDSSH
cd ${REMOTE_DIR}
npm install --omit=dev
sudo pm2 start ecosystem.config.cjs || true
sudo pm2 save
ENDSSH
