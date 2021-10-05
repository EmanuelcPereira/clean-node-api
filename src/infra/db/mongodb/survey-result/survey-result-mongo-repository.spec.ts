import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultsCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }],
    date: new Date()
  })

  const answers = await surveyCollection.findOne({ _id: res.insertedId })

  return answers && MongoHelper.map(answers)
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return account && MongoHelper.map(account)
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultsCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultsCollection.findOne({
        surveyId: survey.id,
        accountId: account.id
      })
      expect(surveyResult).toBeTruthy()
    })

    test('should update survey result if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultsCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const res = await surveyResultsCollection.findOne({
        surveyId: survey.id,
        accountId: account.id
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultsCollection.findOne({
        surveyId: survey.id,
        accountId: account.id
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(res.id)
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
