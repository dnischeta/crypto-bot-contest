#!bin/bash

sudo apt update
sudo apt install -y curl certbot
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version

npm i -g pm2

sudo certbot certonly --standalone -d api.dumasiq.ru
