/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password || body.password.length < 3) {
    return response.status(400).json({error: 'missing username or password'})
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const saveBlog = await user.save()

  response.json(saveBlog)
})


usersRouter.get('/', async(request, response) => {
  const users = await User.find({})
  response.json(users)
})


module.exports = usersRouter