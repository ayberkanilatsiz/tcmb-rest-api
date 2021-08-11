const express = require('express')

const app = express()
const { PORT } = require('./src/helpers/config');
const CurrencyController = require('./src/controllers/currencyController');

app.use('/api', CurrencyController);

app.listen(PORT, () => console.log('server listening on port: '+ PORT))