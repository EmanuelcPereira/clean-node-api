import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import validator from 'validator'
import faker from 'faker'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const email = faker.internet.email()
    const sut = makeSut()
    const emailValidSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(email)
    expect(emailValidSpy).toHaveBeenCalledWith(email)
  })
})
