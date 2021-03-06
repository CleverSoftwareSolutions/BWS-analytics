import 'babel-polyfill';
import 'isomorphic-fetch';
import app from './server';
import {
  connectDatabase,
  registerCalendarClient,
} from './server/db';
import { development, production } from './server/db/config';

const port = process.env.PORT || 4000;

const databaseConfig =
  (process.env.NODE_ENV === 'production') ? production : development;

(async() => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  try {
    await registerCalendarClient();

    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.log(error);
  }
})();
