import * as express from 'express';
import * as passport from 'passport'

import { isAuth } from '../controllers/usersController'
import '../config/passport'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/profile', passport.authenticate('jwt', { session : false }), (req, res, next) => {
  // We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});


export = router;
