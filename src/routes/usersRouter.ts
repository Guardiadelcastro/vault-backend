import * as express from 'express';

import{ registerUser, findUserByEmail } from '../controllers/usersController'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/:email', findUserByEmail);

router.post('/register', registerUser);


export = router;
