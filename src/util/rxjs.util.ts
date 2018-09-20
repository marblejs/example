import { throwError, of } from 'rxjs';
import { isNullable } from './any.util';

export const neverNullable = <T>(data: T) =>
  isNullable(data)
    ? throwError(new Error())
    : of(data as NonNullable<T>);
