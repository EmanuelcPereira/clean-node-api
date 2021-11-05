import { AddSurveyRepository, AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (addSurveyParams: AddSurveyParams): Promise<void> {
    this.addSurveyParams = addSurveyParams
    return Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveyModels()
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return Promise.resolve(this.surveyModels)
  }
}
