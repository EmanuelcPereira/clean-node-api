import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, LoadSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveSurveyResultParams: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (saveSurveyResultParams: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = saveSurveyResultParams
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}
