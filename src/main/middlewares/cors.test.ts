import app from '../config/app'
import request from 'supertest'

describe('Cors middleware', () => {
  test('should enable cors', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
  })
})
