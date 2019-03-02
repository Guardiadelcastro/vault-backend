import * as express from 'express';


const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'This gets all users'})
})

router.get('/profile', (req, res, next) => {
  // We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});


export = router;
