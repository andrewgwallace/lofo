const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3005
const listener = () => console.log(`Server is running on port ${PORT}`)
const knex = require('../db/knex')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  const index = path.join(__dirname, '..client/build/index.html')
  res.sendFile(index)
})

app.get('/api/items', (req, res, next) => {
  knex('items')
  .where('returned', false)
  .then(items => res.json({items: items }))
  .catch(error => { console.lerror(error); })
})

app.post("/api/items", (req, res, next) => {
  knex('items')
    .insert({...req.body, returned: false})
  .then(() => {
    knex('items')
    .then(items => res.json(items))
  })
  .catch(error => { console.error(error); });
});

app.patch('/api/items/:id', (req, res, next) => {
  knex('items').update(req.body)
  .where('id', req.params.id)
  .then(() => {
    knex('items')
    .where('returned', false)
    .then(items => res.json(items))
  })
})

app.delete('/api/items/:id', (req, res, next) => {
  knex('items').del().where('id', req.params.id)
  .then(() => {
    knex('items').then(items => res.json(items))
  })
})

// ERROR HANDLING

// handle error
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})
// not found
app.use((req, res, next) => {
  res.status(404).json({ error: { message: "Not found." } })
})

app.listen(PORT, listener)