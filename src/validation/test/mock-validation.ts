import { Validation } from '@/presentation/protocols'

export const mockValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationCompositeStub()
}
