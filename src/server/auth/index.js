import passport from 'koa-passport';
import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import importDir from 'import-dir';
import User from '../models/User';
import Client from '../models/Client';
import {prefix} from '../routes/config';
import {auth as config} from '../db/config';
import * as provider from './provider';

const strategies = importDir('./strategies');

Object.keys(strategies).forEach(name => {
  passport.use(name, strategies[name]);
});

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(error) {
      done(error);
    }
  })();
});

export default function auth() {
  return compose([
    passport.initialize(),
  ]);
}

export function isClientAuthenticated() {
  return passport.authenticate('client');
}

export function isBearerAuthenticated() {
  return passport.authenticate('bearer', {session: false});
}

export function isJwtAuthenticated() {
  return passport.authenticate('jwt', {session: false});
}

export function generateToken() {
  return async ctx => {
    const {user} = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({client_id: user._id}, user.secret);
      const token = `JWT ${_token}`;

      ctx.status = 200;
      ctx.state.user = user;
      ctx.body = {
        token,
      };
    }
  };
}


const googleCallbackURL = prefix + provider.google.callbackRoute;

export function isGoogleAuthenticated() {
  return passport.authenticate('google', {
    scope: ['email'],
    callbackURL: googleCallbackURL,
  });
}

export function isGoogleAuthenticatedCallback() {
  return passport.authenticate('google', {
    failureRedirect: '/login',
    callbackURL: googleCallbackURL,
  });
}
