require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './handlers/errors';

import router from './routes'

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/lecznica_weterynaryjna', router)

app.use(function (req, res, next) {
  let err = new Error('Nie ma takiego adresu:(');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Magic happens at port ${PORT}`))
