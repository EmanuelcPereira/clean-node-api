import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'
import { loginPath } from './paths/login-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Api do Curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
