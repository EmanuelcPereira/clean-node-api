import { LoadSurveyByIdRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) { }
  async loadById (surveyId: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
    return survey
  }
}
