/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const  mongoose  = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)



test('amount of blog posts', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(0)
})

afterAll(() => {
  mongoose.connection.close()
})