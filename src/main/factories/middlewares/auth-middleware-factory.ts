import { makeDbLoadAccountByToken } from '@/main/factories/usecases'
import { Middleware } from '@/presentation/protocols/middleware'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
