import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'
import { Controller } from '@/presentation/protocols/controller'
import { LoadSurveyResultController } from '@/presentation/controllers/load-survey-result-controller'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())

  return makeLogControllerDecorator(controller)
}
