import {Strategy as GoogleStrategy} from 'passport-google-auth';
import {google} from '../provider';
import User from '../../models/User';
import AccessToken from '../../models/AccessToken';

export default new GoogleStrategy({
  clientId: google.clientId,
  clientSecret: google.clientSecret,
  callbackURL: google.callbackRoute,
}, (accessToken, refreshToken, profile, done) => {
  (async () => {
    try {
      const email = profile._json.email;

      let user = await User.findOne({email});
      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          provider: 'google',
        });
      }

      await AccessToken.findOneAndRemove({user: user._id});

      await AccessToken.create({
        user: user._id,
      });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })();
});
