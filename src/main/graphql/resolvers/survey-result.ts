import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories/controllers'

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => adaptResolver(makeLoadSurveyResultController(), args)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any) => adaptResolver(makeSaveSurveyResultController(), args)
  }
}
