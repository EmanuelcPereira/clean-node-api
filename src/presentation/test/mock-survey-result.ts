import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/Load-survey-result'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveSurveyResultParams: SaveSurveyResultParams
  surveyResult = mockSurveyResultModel()

  async save (saveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = saveSurveyResultParams
    return Promise.resolve(this.surveyResult)
  }
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
