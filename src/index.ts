import { Database, Server } from '@connection';
import { app } from '@app';

const bootstrap = async () => {
  await Database.connect();
  await Server.create(app);
};

bootstrap();
