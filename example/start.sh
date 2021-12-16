#!/bin/bash

# sudo npm i -g eslint expo-cli expo-optimize
npm i
rm -rf node_modules/@siposdani87/sui-rn
mkdir -p node_modules/@siposdani87/sui-rn
cp -R ../dist node_modules/@siposdani87/sui-rn
cp -R ../package.json node_modules/@siposdani87/sui-rn
npm run tsc-test
expo start -c
