#!/bin/bash

rm -rf node_modules/sui-js
rm -rf package-lock.json
npm install
npm outdated
eslint . --fix
npm run tslint 
npm run tsc-test 
