import { loggerWithOpts$ } from '@marblejs/middleware-logger';
import { isTestEnv } from '../../../util';

export const logger$ = loggerWithOpts$({ silent: isTestEnv() });
