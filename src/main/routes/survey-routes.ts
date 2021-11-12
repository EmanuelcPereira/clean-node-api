import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController, makeLoadSurveyController } from '@/main/factories/controllers'
import { adminAuth, auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
