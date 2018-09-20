import { merge } from 'rxjs';
import { toArray, take } from 'rxjs/operators';
import { neverNullable } from '../rxjs.util';

test('#neverNullable throws streamed error if parameter is nullable', done => {
  // given
  const value = 'test';
  const nullable = undefined;

  // when
  const stream$ = merge(
    neverNullable(value),
    neverNullable(nullable)
  ).pipe(
    toArray(),
    take(2),
  );

  // then
  stream$.subscribe(
    data => {
      expect(data[0]).toEqual('test');
      expect(data[1]).toBeUndefined();
    },
    error => {
      expect(error).toBeDefined();
      done();
    },
  );

});
