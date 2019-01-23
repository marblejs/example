#!/bin/bash

if [[ $IS_HEROKU == "true" ]]; then
  yarn build
else
  yarn build
  yarn docker
  yarn test
fi
