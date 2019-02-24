import { createContext } from '@marblejs/core';
import { Database, Server } from '@connection';
import httpListener from '@app';

const bootstrap = async () => {
  await Database.connect();
  await Server.create(httpListener.run(createContext()));
};

bootstrap();
