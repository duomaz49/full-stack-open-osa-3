require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.static('dist'))

app.use(express.json())

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'Person with id not found' })
      }
    })
    .catch((e) => {
      next(e)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    })
  }

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    })
  }


  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((e) => {
      next(e)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const updatedPerson = {
    name,
    number,
  }

  Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).json({ error: 'Person not found' })
      }
    })
    .catch((e) => {
      next(e)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.deleteOne({ _id: id }).then(() => res.status(204).end())
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: 'Persons name must be unique' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
