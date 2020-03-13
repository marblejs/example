import { logger$ as log$ } from '@marblejs/middleware-logger';
import { isTestEnv } from '../util/server/environment';

export const logger$ = log$({ silent: isTestEnv() });
