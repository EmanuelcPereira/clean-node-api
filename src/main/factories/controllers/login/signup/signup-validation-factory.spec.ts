import { makeSignUpValidation } from './signup-validation-factory'
import { Validation } from '@/presentation/protocols'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all verifications', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
