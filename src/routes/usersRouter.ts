import * as express from 'express';

import{ registerUser, findUserByEmail, loginUser, checkUser } from '../controllers/usersController'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/:email', findUserByEmail);

router.post('/check', checkUser)

router.post('/register', registerUser);

router.post('/login', loginUser);


export = router;
