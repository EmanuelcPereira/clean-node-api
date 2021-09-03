import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../errors/missing-param-error'
import { Validation } from './validation'

describe('Validation Composite', () => {
  test('should return an error if validation fails', () => {
    class ValidationCompositeStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationCompositeStub = new ValidationCompositeStub()
    const sut = new ValidationComposite([validationCompositeStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
