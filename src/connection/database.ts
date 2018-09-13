import chalk from 'chalk';
import * as mongoose from 'mongoose';
import { Config } from '../config';

export namespace Database {
  const { urlMain: url } = Config.db;

  const onOpen = () => {
    console.info(chalk.green('[database] connected'));
  };

  const onError = (error: mongoose.Error) => {
    console.error(chalk.red(`[database] connection error: ${error.message}`));
    process.exit();
  };

  export const connect = () =>
    mongoose
      .connect(url, { useNewUrlParser: true })
      .then((onOpen))
      .catch(onError);
}
