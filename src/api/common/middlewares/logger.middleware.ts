import { logger$ as log$ } from '@marblejs/middleware-logger';
import { isTestEnv } from '@util';

export const logger$ = log$({ silent: isTestEnv() });
