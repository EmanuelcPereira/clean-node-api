import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (surveyId: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
    return survey
  }
}
