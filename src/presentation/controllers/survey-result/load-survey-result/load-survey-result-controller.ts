import { HttpRequest, HttpResponse, Controller, LoadSurveyById, LoadSurveyResult } from './load-survey-result-controller-protocols'
import { serverError, forbidden, ok } from '@/presentation/helpers/http/http-helper';
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const surveyResult = await this.loadSurveyById.loadById(surveyId)

      if (!surveyResult) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const loadSurveyResult = await this.loadSurveyResult.load(surveyId)
      return ok(loadSurveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
