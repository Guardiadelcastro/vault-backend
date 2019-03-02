import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';

import User from '../models/User';
import config from '../config/config'

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// Passport Local
passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if(!user){
      return done(null, false, { message : 'Login Failed: Check email and password' });
    }
    const validate = await user.comparePassword(password);
    if(!validate){
      return done(null, false, { message : 'Login Failed: Check email and password' });
    }
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));


// Passport JWT
passport.use(new JWTStrategy({
  // secret we used.
  secretOrKey : config.jwt.secretOrKey,
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
