<p align="center">
  <a href="http://marblejs.com">
    <img src="https://github.com/marblejs/marble/blob/master/assets/img/logo.png?raw=true" width="320" alt="Marble.js logo"/>
  </a>
</p>

<p align="center">
<img src="https://travis-ci.com/marblejs/example.svg?branch=master" alt="Travis-CI status" height="18">
<a href="https://codecov.io/gh/marblejs/example?branch=master">
  <img src="https://codecov.io/gh/marblejs/example/coverage.svg?branch=master" alt="Codecov coverage" height="18">
</a>
</p>

<p align="center">
Example project written using Marble.js framework
</p>

## Requirements
In order to run tests locally, please install `docker` which containerizes the testing mongodb database.

## Installation

```bash
$ cp ./src/config/env.ts.dist ./src/config/env.ts
$ yarn
````

## Basic commands

```bash
$ yarn start           ## run server
$ yarn watch           ## run server in watch mode (development)
$ yarn build           ## build the app
$ yarn lint            ## lint TypeScript files
$ yarn test            ## run tests with coverage report
$ yarn test:watch      ## run tests in watch mode
$ yarn docker          ## start mongodb container
```

## API doc
You can reach the actual API documentation [here](https://marblejs.docs.apiary.io)

## License

marble.js is MIT licensed
