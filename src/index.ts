import { createContext } from '@marblejs/core';
import { Database } from '@database/index';
import { Server } from './util/server';
import httpListener from './app';

const bootstrap = async () => {
  await Database.connect();
  await Server.create(httpListener.run(createContext()));
};

bootstrap();
