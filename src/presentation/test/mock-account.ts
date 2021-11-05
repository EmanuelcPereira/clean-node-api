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
  atuhetication: AuthenticationParams
  token = faker.datatype.uuid()

  async auth (atuhetication: AuthenticationParams): Promise<string> {
    this.atuhetication = atuhetication
    return Promise.resolve(this.token)
  }
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenStub()
}
