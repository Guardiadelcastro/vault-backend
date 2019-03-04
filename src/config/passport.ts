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
    // Find the user associated with the email provided by the user
    const user = await User.findOne({ email });
    if( !user ){
      // If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.comparePassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    // Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));


// Passport JWT
passport.use(new JWTStrategy({
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

