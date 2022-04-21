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
    if (!("company" in req.params)){
      res.status(400).send({
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

  // GET /dates by whether or not they can be scheduled on a particular day
  app.get('/dates/:company/:available', (req, res) => {
    if (!("company" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company`",
      });
    }
    else if (!("available" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `available`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          isAvailable = false;
          if (req.params.available == "true"){
            isAvailable = true;
          }
          connection.query('SELECT * FROM Dates WHERE company_id = ? AND is_available = ?', [req.params.company, isAvailable], function (err, rows, fields) {
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

  // GET /dates by whether or not they have been scheduled on a particular day
  app.get('/dates/:company/true/:scheduled', (req, res) => {
    if (!("company" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company`",
      });
    }
    else if (!("scheduled" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `scheduled`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          isScheduled = false;
          if (req.params.scheduled == "true"){
            isScheduled = true;
          }
          connection.query('SELECT * FROM Dates WHERE company_id = ? AND is_scheduled = ?', [req.params.company, isScheduled], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching dates: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining dates"
              })
            } else {
              console.log(rows);
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      });
    }
  });

// PUT /dates/:id Update a date at a particular id
  app.put('/dates/:id', (req, res) => {
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    else if (!("is_available" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `is_available`",
      });
    }
    else if (!("is_scheduled" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `is_scheduled`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query('UPDATE Dates SET is_available = ? AND is_scheduled = ? WHERE id = ?', [req.body.is_available, req.body.is_scheduled, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating dates: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating dates"
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

  // GET /employee by company
  app.get('/employee/:company', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("company" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query('SELECT * FROM Employee WHERE company_id = ?', req.params.company, function (err, rows, fields) {
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
    }   
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