import * as passport from 'passport'

import './passport'

export const isAuth = passport.authenticate('jwt', { session : false })
