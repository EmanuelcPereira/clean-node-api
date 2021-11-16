
import { LoadSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, forbidden, ok } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveyByIdSpy: CheckSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)

  return {
    sut,
    checkSurveyByIdSpy,
    loadSurveyResultSpy
  }
}

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})

describe('LoadSurveyResult Controller', () => {
  test('should call CheckSurveyById with correct value', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSurveyByIdSpy.id).toBe(request.surveyId)
  })

  test('should return 403 if CheckSurveyById returns null', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    checkSurveyByIdSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
  })

  test('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(loadSurveyResultSpy.result))
  })
})
