import { HttpRequest, HttpResponse, Controller, LoadSurveyById } from './load-survey-result-controller-protocols'
import { serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly LoadSurveyById: LoadSurveyById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const surveyResult = await this.LoadSurveyById.loadById(surveyId)

      if (!surveyResult) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
