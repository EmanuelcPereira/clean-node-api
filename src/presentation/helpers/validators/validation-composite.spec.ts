import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../errors/missing-param-error'
import { Validation } from './validation'

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationCompositeStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('should return an error if validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
