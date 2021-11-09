import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AuthenticationModel } from '@/domain/models/authentication'
import faker from 'faker'
export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccountParams
  accountModel = mockAccountModel()

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authentication: AuthenticationParams
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    this.authentication = authentication
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role?: string
  accountModel = mockAccountModel()

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.accountModel)
  }
}
