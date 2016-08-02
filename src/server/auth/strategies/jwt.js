import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
import Client from '../../models/Client';
import {auth} from '../../db/config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: auth.secret,
};

export default new JWTStrategy(opts, async (jwt_payload, done) => {
  (async () => {
    try {
      const client = await Client.findOne({_id: jwt_payload.client_id});

      if (client) {
        done(null, client);
      } else {
        done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })();
});
