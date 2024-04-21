#!/usr/bin/env bash
APP_PROF=production
if [ "x$1" != "x" ]; then
  APP_PROF=$1
fi
git reset --hard HEAD
git pull
rm -rf node_modules
npm install
npm run build
export NODE_ENV=$APP_PROF
pm2 startOrReload ecosystem.config.js

# Usage: ./runservice.sh development