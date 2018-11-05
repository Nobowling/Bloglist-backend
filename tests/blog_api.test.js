const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { usersInDb }= require('./test_helper')
const User = require('../models/user')

describe.skip('GET blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    console.log(response.body)
  })

  test('right amount of blogs is returned', async () => {
    const response = await api
      .get('/api/blogs')
      
    expect(response.body.length).toBe(2)
    console.log(response.body.length)
  })
})

describe.skip('post blog', () => {
  test('dummy test is working', async () => {
    expect(2).toBe(2)
    // teeee POST testi 
  })

  test('POST /api/blogs succeeds with valid data', async () => {

    const newBlog = {
      title: 'Testin testiblogi test test',
      author: 'Tiina tietysti',
      url: 'www.bestblog.com',
      likes: 800
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
  })
/*
  test('POST /api/notes fails with proper statuscode if content is missing', async () => {
    const newNote = {
      important: true
    }

    const notesAtStart = await notesInDb()

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAfterOperation = await notesInDb()

    expect(notesAfterOperation.length).toBe(notesAtStart.length)
  })*/
})


describe('creating new user', () =>{
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'testuser', password: 'testpass' })
    await user.save()
  })
  
  test('POST /api/users fails with proper statuscode and message if username already exists', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if password is shorter than 3 characters', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'testuuseri',
      name: 'Superuser',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be at least 3 characters' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)

  })


})

afterAll(() => {
  server.close()
})

