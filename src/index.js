// Инициализация слушателей
require('./modules/user/user.listener')

const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./api')(app)

const { port } = require('../config')
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
