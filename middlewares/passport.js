const passport = require('passport');
const { findOrCreate } = require('../database/engine/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        findOrCreate(profile);
        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);
