import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols/db/survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResult.Params

  async save (data: SaveSurveyResult.Params): Promise<void> {
    this.saveSurveyResultParams = data
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  accountId: string
  surveyResultModel = mockSurveyResultModel()

  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.surveyResultModel
  }
}
