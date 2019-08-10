import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from './middleware/cors';
import { logger$ } from './middleware/logger';
import { routes$ } from './resources';

const middlewares = [
  cors$,
  logger$,
  bodyParser$(),
];

const effects = [
  routes$,
];

export default httpListener({ middlewares, effects });
