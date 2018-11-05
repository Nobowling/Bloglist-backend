const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {

  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    if (body.password.length < 3){
      return response.status(400).json({ error: 'password must be at least 3 characters' })
    }
    const salt =  bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(body.password, salt);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult === undefined ? true : body.adult
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
  try {
  const users = await User
    .find({})
    .populate('blogs', { title: 1 })

    response.json(users.map(User.format))

  } catch (exception){
    console.log(exception)
    console.log(reponse)
  }
})

module.exports = usersRouter