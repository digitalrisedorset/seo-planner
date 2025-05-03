import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

const sessionMaxAge = 60 * 60 * 24 * 30

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET!,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  httpOnly: true,
})

const auth = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name email isAdmin',
  session,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      isAdmin: true,
    },
  },
})

export const withAuth = auth.withAuth
export { session }
