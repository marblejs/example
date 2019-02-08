import { HttpRequest } from '@marblejs/core';
import { getProtocol, getHostname } from '../http.util';

const mockHttpRequest = (headers: Record<string, any> = {}) => ({
  headers: headers || {},
} as HttpRequest);

test('#getProtocol returns "http" or "https"', () => {
  const reqWithHttp = mockHttpRequest({ referer: 'http://www.test.com' });
  const reqWithHttps = mockHttpRequest({ referer: 'https://www.test.com' });
  expect(getProtocol(reqWithHttp)).toEqual('http');
  expect(getProtocol(reqWithHttps)).toEqual('https');
});

test('#getHostname returns request hostname', () => {
  const req = mockHttpRequest({ referer: 'http://test.com/api/v1', host: 'test.com' });
  expect(getHostname(req)).toEqual('http://test.com');
});
