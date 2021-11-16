import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoginController, makeSignUpController } from '@/main/factories/controllers'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
