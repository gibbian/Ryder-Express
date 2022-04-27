require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');

const routes = require('./routes/routes.js');
const loginroutes = require('./routes/loginroutes.js');

const {authenticateJWT} = require('./middleware/auth.js');

// Longest uptime 24 mins before user forced shutdown
var connection = mysql.createPool({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

// set up some configs for express.
const config = {
  name: 'thursdayteam2',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
loginroutes(app, logger);

//routes require authenticateJWT middleware
//app.use('/', authenticateJWT, routes);
routes(app, logger);

//routes.use(authenticateJWT);



app.get('/health', (request, response, next) => {
    const port = config.port;
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    next();
});

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

connection.getConnection(function (err) {
  if (err)
    logger.error("Cannot connect to the DB!");
  logger.info("Connected to the DB!");
});
