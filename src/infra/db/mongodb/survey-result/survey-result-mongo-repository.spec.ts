import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { mockAddSurveyParams, mockAddAccountParams } from '@/domain/test'

let surveyCollection: Collection
let surveyResultsCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())
  const answers = await surveyCollection.findOne({ _id: res.insertedId })

  return answers && MongoHelper.map(answers)
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return account && MongoHelper.map(account)
}

describe('SurveyResultMongoRepository', () => {
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
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      await surveyResultsCollection.findOne({
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

      const surveyResult = await surveyResultsCollection.find({
        surveyId: survey.id,
        accountId: account.id
      }).toArray()
      expect(surveyResult).toBeTruthy()
    })
  })

  describe('loadBySurveyId()', () => {
    test('should load survey result', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultsCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })

    test('should return null if there is no survey result', async () => {
      const survey = await makeSurvey()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeNull()
    })
  })
})
