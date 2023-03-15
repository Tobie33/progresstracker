import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../controllers/_helpers/prisma.js'

passport.use(new LocalStrategy({
  usernameField: 'nameOrEmail',
  passwordField: 'password',
  session: false
}, async (nameOrEmail, password, done) => {
  try {
    const user = await prisma.user.findFirst({ where: {
      OR: [
        {
          name: nameOrEmail
        }, {
          email: nameOrEmail
        }
      ]
    } })
    if (!user) return done(null, false, { email: 'Email/ Username Not Found' })
    if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { password: 'Incorrect Password' })
    return done(null, _.omit(user, ['passwordHash']))
  } catch (err) {
    return done(err)
  }
}))

export default passport
