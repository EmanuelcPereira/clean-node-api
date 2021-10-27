import { HttpRequest, HttpResponse, Controller, LoadSurveyById, forbidden, InvalidParamError } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly LoadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    const surveyResult = await this.LoadSurveyById.loadById(surveyId)

    if (!surveyResult) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return Promise.resolve(null)
  }
}
