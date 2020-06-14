#!/bin/bash
echo "remove all folders"
rm -rf node_modules www package-lock.json platforms plugins
echo "create new www folder"
mkdir www
echo "install npm packages"
npm install
echo "run cordova prepare"
cordova prepare
echo "run ios-build"
npm run ios-build
echo "success!!!!!"
open platforms/ios