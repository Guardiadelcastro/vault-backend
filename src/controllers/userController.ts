export function registerUser(newUser) {
  const { username, name, email, password } = newUser

  if (!username || !name || !email || !password) {
     const error = {error: 'Missing user fields'}
     return error

  }

  const user = new User({
    username, name, email, password
  })

}

