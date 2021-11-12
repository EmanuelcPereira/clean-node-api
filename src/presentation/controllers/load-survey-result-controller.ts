
import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { serverError, forbidden, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) { }

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request
      const surveyResult = await this.loadSurveyById.loadById(surveyId)

      if (!surveyResult) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const loadSurveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return ok(loadSurveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
