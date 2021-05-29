require('express-async-errors');
const cookieParser = require('cookie-parser');
const { json, urlencoded } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const { verifIsAuthenticated } = require('xelor');
const error = require('./src/middlewares/errors.middleware');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  }
);
module.exports = (app) => {
  app.use(helmet());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.get('env') === 'development' &&
    app.use(morgan('combined', { stream: accessLogStream }));
  // Routes

  app.use(error);
  app.use(verifIsAuthenticated);
};
