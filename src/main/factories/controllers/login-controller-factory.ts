import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LoginController } from '@/presentation/controllers/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
