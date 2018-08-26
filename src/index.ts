import { createServer } from 'http';
import { Config } from './config';
import { app } from './app';

const SERVER_HOSTNAME = Config.server.host;
const SERVER_PORT = Config.server.port;

createServer(app).listen(
  SERVER_PORT,
  SERVER_HOSTNAME,
  () => console.log(`Server running @ http://${SERVER_HOSTNAME}:${SERVER_PORT}/`),
);
