import * as path from 'path';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { Effect } from '@marblejs/core';
import { ContentType } from '@marblejs/core/dist/+internal/http';
import * as FileHelper from '@marblejs/core/dist/+internal/files';

const STATIC_PATH = path.resolve(__dirname, '../../../../dist');
const DOC_ENTRYPOINT = 'docs.html';
const headers = { 'Content-Type': ContentType.TEXT_HTML };

export const getDocEffect$: Effect = req$ =>
  req$.pipe(
    mapTo(DOC_ENTRYPOINT),
    mergeMap(FileHelper.readFile(STATIC_PATH)),
    map(body => ({ body, headers })),
  );
