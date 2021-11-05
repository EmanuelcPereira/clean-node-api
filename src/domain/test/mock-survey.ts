import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word()
    }, {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveyModels = (): SurveyModel[] => {
  return [{
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  },
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }]
}

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    image: faker.image.imageUrl()
  }],
  date: faker.date.recent()
})
