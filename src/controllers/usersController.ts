import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'

import User from '../models/User';
import config from '../config/config'
import '../config/passport';

export async function registerUser(req, res) {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      res.status(403).json({ message: 'Unable to register user' });
      return;
    }

    let user = await User.findOne({ email })

    if(user) {
      res.status(403).json({ message: 'Unable to register user' })
      return;
    }

    user = new User({ username, name, email, password})
    await user.save()
    res.status(200).json({ message: 'User Created',})

  } catch(err) {
    res.json({ message: 'Unable to register user' });
  }

}

export async function findUserByEmail(req, res) {
  const { email } = req.params
  try {
    const user = await User.findOne({ email });
    res.json({user})
  } catch(err) {
    res.json({ message: 'User not found'})
  }
}


export async function loginUser (req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) {return next(error)}
        // Token Body
        const body = { _id: user._id, email: user.email, username: user.username };
        // Sign the JWT token and populate the payload with the body
        const token = jwt.sign({ user: body }, config.jwt.secretOrKey);
        // Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

export async function checkUser(req, res) {
  try{
    const { email, password } = req.body;
    const userL = await User.findOne({ email })
    const comparedPassword = await userL.comparePassword(password)

    if(!userL || !comparedPassword) {
      throw new Error(`Couldn't check password`)
    }
    res.json({email, password, userL, comparedPassword})
  } catch (err) {
    res.json({ message: `Oops, something went wrong` })
  }
}
