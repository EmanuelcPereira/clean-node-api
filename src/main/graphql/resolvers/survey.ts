import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyController } from '@/main/factories/controllers'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveyController(), args, context)
  }
}
