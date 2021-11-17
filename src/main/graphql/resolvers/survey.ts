import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoadSurveyController } from '@/main/factories/controllers'

export default {
  Query: {
    survey: async () => adaptResolver(makeLoadSurveyController())
  }
}
