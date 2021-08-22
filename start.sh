#!/bin/bash

sudo npm i -g eslint expo-cli expo-optimize
rm -rf node_modules/sui-js
rm -rf node_modules/expo-rich-text-editor
rm -rf node_modules/expo-maps-polygon-editor
rm -rf package-lock.json
npm install
npm outdated
eslint . --fix
npm run tsc-test 
expo start -c
