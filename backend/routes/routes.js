const pool = require('../db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // GET /dates
  app.get('/dates', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Dates', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching dates: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining dates"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET /dates by company
  app.get('/dates/:company', (req, res) => {
    if (!("company" in req.params))
    {
      res.status(400).send(
      {
        success: false,
        response: "Missing required field: `company`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query('SELECT * FROM Dates WHERE company_id = ?', req.params.company, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching dates: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining dates"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    }
    
  });

  // GET /employee
  app.get('/employee', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Employee', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching employees: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining employees"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET /delivery
  app.get('/delivery', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Delivery', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching deliveries: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining deliveries"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET /shipper
  app.get('/shipper', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Shipper', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching shippers: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining shippers"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET /customer
  app.get('/customer', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM Customer', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching customers: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining customers"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}