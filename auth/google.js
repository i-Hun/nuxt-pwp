const config = require('./config.js');

// const GoogleOAuthStrategy = require('passport-google-oauth').OAuthStrategy;
// module.exports = (passport) => {
//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((user, done) => done(null, user));
//   passport.use(new GoogleOAuthStrategy(
//       {
//         consumerKey: config.oAuthClientID,
//         consumerSecret: config.oAuthclientSecret,
//         callbackURL: config.oAuthCallbackUrl,
//         // Set the correct profile URL that does not require any additional APIs
//         userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
//       },
//       (token, refreshToken, profile, done) => done(null, {profile, token})));
// };

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: "255526043133-620pdn8tjtc2sd2ivtk8cvtll63vhovd.apps.googleusercontent.com",
    consumerSecret: "-pSFs_GW41kRX8m-Dk-YMt8J",
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

export default passport;