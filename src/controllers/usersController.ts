import User from '../models/User';

export async function registerUser(req, res) {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      res.status(403).json({ message: 'Unable to register user' });
      return;
    }

    let user = await User.findOne({ email: email })

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
  const{ email } = req.params
  try{
    const user = await User.findOne({ email: email });
    res.json({user})
  } catch(err) {
    res.json({ message: 'User not found'})
  }
}
