#!/bin/bash

if [ ! -d "dist" ]; then
cd ../front
npm install
npm run build
cp dist ../backend
npm run serve
else
npx nodemon -- app.mjs
fi
