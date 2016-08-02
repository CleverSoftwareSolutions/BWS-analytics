
import AccessToken from '../../models/AccessToken';
import {
  isGoogleAuthenticated,
  isGoogleAuthenticatedCallback,
  isClientAuthenticated,
  generateToken,
} from '../../auth';
import * as provider from '../../auth/provider';

export default (router) => {
  router
    .post('/auth/client',
      isClientAuthenticated(),
      generateToken());


    // router
    //   .get(provider.google.route, isGoogleAuthenticated())
    //   .get(provider.google.callbackRoute,
    //     isGoogleAuthenticatedCallback(),
    //     async ctx => {
    //       const accessToken = await AccessToken.findOne({
    //         user: ctx.passport.user._id,
    //       });
    //
    //       ctx.body = {
    //         access_token: accessToken,
    //         token_type: 'Bearer',
    //       };
    //     }
    //   );
};
