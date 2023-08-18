require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');
const errorsCode = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cors);

app.use(requestLogger);
app.use(routes);

app.use('*', (_req, res) => {
  res.status(NOT_FOUND).json({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());
app.use(errorsCode);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
