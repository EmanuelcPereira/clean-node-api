
import { LoadSurveysController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadSurveysController.Request => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys with correct values', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveysSpy.accountId).toBe(request.accountId)
  })

  test('should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSurveysSpy.surveyModels))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpsResponse = await sut.handle(mockRequest())
    expect(httpsResponse).toEqual(serverError(new Error()))
  })
})
