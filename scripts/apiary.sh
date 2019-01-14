#!/bin/bash

echo "-------------"
echo "API blueprint"

if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_PULL_REQUEST == "false" ]]; then
  echo "Publishing to marblejs"
  apiary publish --api-name=marblejs --path ./dist/docs.apib
else
  echo "Publishing to marblejs-dev"
  apiary publish --api-name=marblejsdev --path ./dist/docs.apib
fi
