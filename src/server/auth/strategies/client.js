import Client from '../../models/Client';
import {Strategy as CustomStrategy} from 'passport-custom';

export default new CustomStrategy(async (ctx, done) => {
  try {
    if(ctx.body.id && ctx.body.secret) {
      const client = await Client.findOne({id: ctx.body.id});
      if(!client) done(null, false);
      if(ctx.body.secret !== client.secret) done(null, false);
      if(client.trusted !== true) done(null, false);

      done(null, client);
    } else {
      done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});
