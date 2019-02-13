import { Database } from './connection/database';
import { Server } from './connection/server';
import { app } from './app';

const bootstrap = async () => {
  await Database.connect();
  await Server.create(app);
};

bootstrap();
