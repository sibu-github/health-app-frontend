#!/bin/bash

# 
# Few things to take care for android production build
# 1. version in package.json
# 2. before generating the apk from android studio
#  make sure to comment out the read_phone_state permission
# in android-manifest.xml file
# 
# 




echo "removing files"
rm -rf www package-lock.json platforms dist node_modules
echo "install dependency & create www folder"
npm i && mkdir www
echo "add android platform and build"
cordova platform add android && npm run android-build


