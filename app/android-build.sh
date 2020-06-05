#!/bin/bash

echo "removing files"
rm -rf www package-lock.json platforms dist node_modules
echo "install dependency & create www folder"
npm i && mkdir www
echo "add android platform and build"
cordova platform add android && npm run android-build


