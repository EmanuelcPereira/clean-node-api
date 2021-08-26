import app from '../config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  test('should returns an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Emanuel Pereira',
        email: 'emanuelcdpr@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
