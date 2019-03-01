import User from '../models/User';

export function registerUser(req, res, next) {
  const { username, name, email, password } = req.body

  let error = [];
  if (!username || !name || !email || !password) {
     error.push('Missing user fields');
  }

  if (error.length > 0) {
    res.json({ error: { message: error } })
  }

  const user = new User({
    username,
    name,
    email,
    password
  })
  user.save()

  res.status(200).json({
    message: 'User Created',
    "New User": user,
  })
}
