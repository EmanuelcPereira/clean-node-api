import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel, mockSurveyResultModel, LoadSurveyResultRepository } from './db-load-survey-result-protocols'

describe('DbLoadSurveyResult UseCase', () => {
  test('should call LoadSurveyResultRepository with correct values', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
