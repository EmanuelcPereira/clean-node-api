import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) { }
  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const saveSurveyResult = await this.saveSurveyResultRepository.save(data)
    return saveSurveyResult
  }
}
