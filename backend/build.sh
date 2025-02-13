#!/bin/bash

if [ ! -d "./dist" ]; then
cd ../front
npm install
npm run build
mv dist ../backend
cd ../backend
npm install
npm run start
else
npx nodemon -- app.mjs
fi
