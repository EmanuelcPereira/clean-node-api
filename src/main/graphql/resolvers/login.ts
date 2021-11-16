import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoginController } from '@/main/factories/controllers'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  }
}
