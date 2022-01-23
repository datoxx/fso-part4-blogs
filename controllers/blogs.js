/* eslint-disable linebreak-style */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  
  if(blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({error: 'blog is invalid'})
  } 

  const saveBlog = await blog.save()
  response.status(201).json(saveBlog)
  
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/api/blogs/:id', async(request, response) => {
  const body = request.body

  const upDateBlog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})  
  response.json(upDateBlog)
})


module.exports = blogsRouter