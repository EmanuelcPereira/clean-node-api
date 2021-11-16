import setupMiddlewares from './middlewares'
import setupApolloServer from './apollo-server'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'
import express from 'express'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupApolloServer(app)

export default app
