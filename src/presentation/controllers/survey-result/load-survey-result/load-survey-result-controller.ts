import { HttpRequest, HttpResponse, Controller, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly LoadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.LoadSurveyById.loadById(httpRequest.params.surveyId)
    return Promise.resolve(null)
  }
}
