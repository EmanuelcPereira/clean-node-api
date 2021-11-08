import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import faker from 'faker'
export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccountParams
  accountModel = mockAccountModel()

  async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = addAccountParams
    return Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authentication: AuthenticationParams
  token = faker.datatype.uuid()

  async auth (authentication: AuthenticationParams): Promise<string> {
    this.authentication = authentication
    return Promise.resolve(this.token)
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
