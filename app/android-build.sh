#!/bin/bash

rm -rf www platform plugins package-lock.json node_modules
mkdir www
cordova platform add android && npm run android-build
npm i && mkdir www
cordova platform add android && npm run android-build
