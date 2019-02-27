import * as express from 'express';

import{ registerUser } from '../controllers/userController'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/:id', (req, res) => {
  const id = {id: req.params.id}
  res.json(id)
})

router.post('/register', (req, res) => {
  registerUser(req);
})


export = router;
