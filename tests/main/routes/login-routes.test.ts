import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should returns 200 on signup', async () => {
      app.post('/api/signup', (req, res) => res.send())
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

  describe('POST /login', () => {
    test('should returns 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Emanuel Pereira',
        email: 'emanuelcdpr@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'emanuelcdpr@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('should returns 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'emanuelcdpr@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})