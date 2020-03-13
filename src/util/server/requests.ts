import { HttpRequest } from '@marblejs/core';

export const getProtocol = (req: HttpRequest) =>
  req.headers.referer
    ? req.headers.referer.split(':')[0]
    : 'http';

export const getHostname = (req: HttpRequest) =>
  getProtocol(req) + '://' + req.headers.host;
