global.Promise = require('bluebird');
import Koa from 'koa';
import middleware from './middleware';
import auth from './auth';
import api from './routes';

const app = new Koa();

app.use(middleware());
app.use(auth());
app.use(api());
app.use(ctx => ctx.status = 404);

export default app;
