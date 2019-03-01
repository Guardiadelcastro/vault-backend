import User from '../models/User';

export async function registerUser(req, res) {
  const { username, name, email, password } = req.body

  if (!username || !name || !email || !password) {
    res.status(403).json({ message: 'Unable to register user' })
  }

  try{
    const user = await User.findOne({ email: email })
    if(user) {
      res.status(403).json({ message: 'Unable to register user' })
    }
  } catch(err) {
    res.status(403).json({ message: 'Unable to register user' })
    throw err
  }

  const user = new User({
    username,
    name,
    email,
    password
  })

  try{
    await user.save()
  } catch(err) {
    res.status(403).json({ message: 'Unable to register user' })
  }

  res.status(200).json({
    message: 'User Created',
  })

}

export async function findUserByEmail(req, res) {
  const{ email } = req.params
  try{
    const user = await User.findOne({ email: email });
    res.json({user})
  } catch(err) {
    res.json({ message: 'User not found'})
  }
}
