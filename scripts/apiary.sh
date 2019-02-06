#!/bin/bash

echo "-------------"
echo "API blueprint"

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "Skipping, publishing is enabled only for non-PR builds"
  exit 0
fi

ENV=""
if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  ENV="marblejs"
fi

if [[ "$ENV" == "" ]]; then
  echo "Skipping, unsupported environment for branch ${TRAVIS_BRANCH}"
  exit 0
fi

echo "Publishing to environment $ENV from branch ${TRAVIS_BRANCH}"
apiary publish --api-name=$ENV --path ./dist/docs.apib
