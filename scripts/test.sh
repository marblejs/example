#!/bin/bash

if [[ $IS_TRAVIS_CI == "true" ]]; then
  jest --expand --forceExit --coverage
else
  jest --expand --coverage
fi
