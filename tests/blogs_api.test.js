/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const  mongoose  = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blog are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('addition of a new blog', () => {
  test('add new blog', async() => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map(item => item.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain('First class tests')
  })
})

test('amount of blog posts', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog id ', async() => {
  const response = await api.get('/api/blogs')

  const identId = response.body.map(item => item.id)
  expect(identId).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})