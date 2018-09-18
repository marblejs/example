import { isNullable } from '../any.util';

test('#isNullable checks if parameter is null or undefined', () => {
  expect(isNullable('0')).toEqual(false);
  expect(isNullable(0)).toEqual(false);
  expect(isNullable(false)).toEqual(false);
  expect(isNullable(undefined)).toEqual(true);
  expect(isNullable(null)).toEqual(true);
});
