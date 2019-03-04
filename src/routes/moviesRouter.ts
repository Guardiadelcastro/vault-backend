import * as express from 'express';
import * as passport from 'passport'

import '../middlewares/passport'
import { isAuth } from '../middlewares/auth';

const router = express.Router()
router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/profile', isAuth, (req, res, next) => {
  // We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.headers.authorization
  })
});


export = router;
