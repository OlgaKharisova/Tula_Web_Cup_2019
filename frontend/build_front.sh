#!/usr/bin/env bash

BACKEND_RESOURCES='../backend/src/main/resources/static/'
echo "Build front using NPM " `npm --version`
rm -rf build/*
npm install && npm run-script build
rm -rf ${BACKEND_RESOURCES}
mkdir -p ${BACKEND_RESOURCES}
mv build/*.* ${BACKEND_RESOURCES}