import { cors$ as corsMiddleware$ } from '@marblejs/middleware-cors';

export const cors$ = corsMiddleware$({
  origin: '*',
  methods: ['OPTIONS', 'GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'HEAD'],
  allowHeaders: ['Authorization', 'Content-Type', 'Origin'],
});
