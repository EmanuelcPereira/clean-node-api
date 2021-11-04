import { LoadSurveyResultRepository, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data
    return Promise.resolve()
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  surveyResultModel = mockSurveyResultModel()

  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return Promise.resolve(this.surveyResultModel)
  }
}
