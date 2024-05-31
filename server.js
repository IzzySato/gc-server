const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./lib/logger.js');
const cookieSession = require('cookie-session');

const projectRouter = require('./routes/project/index.js');
const { dbConnect } = require('./database/db_config.js');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

require('./lib/cache.js');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '150mb',
    extended: true,
  })
);

// Database Connect
dbConnect();

app.use('/project', projectRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
