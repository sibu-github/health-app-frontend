#!/bin/bash
rm -rf node_modules www package-lock.json platforms plugins
mkdir www
npm install
cordova prepare
npm run ios-build
