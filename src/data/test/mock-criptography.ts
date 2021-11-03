import { Hasher } from '@/data/protocols/criptography/hasher'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import faker from 'faker'

export class HasherSpy implements Hasher {
  plaintext: string
  digest = faker.datatype.uuid()

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isvalid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isvalid
  }
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}
