#!/bin/bash

rm -rf node_modules/@siposdani87/sui-rn
mkdir -p node_modules/@siposdani87/sui-rn
cp -R ../dist node_modules/@siposdani87/sui-rn
cp ../package.json node_modules/@siposdani87/sui-rn
npm run tsc-test
npm run start
