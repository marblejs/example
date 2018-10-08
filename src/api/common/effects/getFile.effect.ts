import * as path from 'path';
import { throwError, of, iif } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Effect, HttpError, HttpStatus } from '@marblejs/core';
import * as FileHelper from '@marblejs/core/dist/+internal/files';

const STATIC_PATH = path.resolve(__dirname, '../../../../assets');

export const getFileEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req => of(req.params.dir as string).pipe(
      mergeMap(FileHelper.readFile(STATIC_PATH)),
      map(body => ({ body })),
      catchError(error => iif(
        () => error.code === 'ENOENT',
        throwError(new HttpError(`Asset not found for path: ${req.url}`, HttpStatus.NOT_FOUND)),
        throwError(new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)),
      )),
    )),
  );
