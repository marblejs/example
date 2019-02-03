import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from './api/common/middlewares/logger.middleware';
import { cors$ } from './api/common/middlewares/cors.middleware';
import { api$ } from './api';

const middlewares = [
  cors$,
  logger$,
  bodyParser$(),
];

const effects = [
  api$,
];

export const app = httpListener({ middlewares, effects });
