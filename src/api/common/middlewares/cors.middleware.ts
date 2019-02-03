import { HttpMiddlewareEffect } from '@marblejs/core';
import { tap } from 'rxjs/operators';

export const cors$: HttpMiddlewareEffect = (req$, res) =>
  req$.pipe(
    tap(() => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', [
        'Authorization',
        'Content-Type',
        'Origin',
        '*'
      ]);
      res.setHeader('Access-Control-Allow-Methods', [
        'OPTIONS',
        'GET',
        'PATCH',
        'POST',
        'PUT',
        'DELETE',
        'HEAD',
      ]);
    }),
  );
