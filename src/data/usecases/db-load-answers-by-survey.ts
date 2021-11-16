import { LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadAnswersBySurvey } from '@/domain/usecases/load-answers-by-survey'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) { }

  async loadAnswers (surveyId: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)

    return survey?.answers.map(a => a.answer) || []
  }
}
