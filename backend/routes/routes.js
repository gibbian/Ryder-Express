const express = require('express');
const pool = require('../db')
// const appr = require('../models/account');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../middleware/auth');
//const JWT_SECRET = 'sneekysneekysecret';
//const app = express.router();




module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });


///////////////////////////DATES///////////////////////////////////////////////

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
  app.get('/dates/:company',(req, res) => {
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

///////////////////////////////EMPLOYEES/////////////////////////////////////////////


  // GET /employees
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

 // GET /employees by company
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

  // GET /employee by company and id
  app.get('/employee/:company/:id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("company" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company`",
      });
    }
    else if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
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
          connection.query('SELECT * FROM Employee WHERE company_id = ? AND id = ?', [req.params.company, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching employee: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining employee"
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


////////////////////////////////DELIVERY//////////////////////////////////////////////

  //POST delivery with buyer_id, seller_id, employee_id, origin_loc, destination, product_name, date_received
  app.post('/delivery', (req, res) => {
    if (!("buyer_id" in req.body)){ //foreign key requirement
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `buyer_id`",
      });
    }
    else if (!("seller_id" in req.body)){ //foreign key requirement
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `seller_id`",
      });
    }
    else if (!("employee_id" in req.body)){ //foreign key requirement
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `employee_id`",
      });
    }
    else if (!("origin_loc" in req.body)){ //needs to be a valid location
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `origin_loc`",
      });
    }
    else if (!("destination" in req.body)){ //needs to be a valid location
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `destination`",
      });
    }
    else if (!("product_name" in req.body)){ //Product needs a name
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `product_name`",
      });
    }
    else if (!("date_received" in req.body)){ //Product needs a start date
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `date_received`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection');
        } else {
          connection.query('INSERT INTO Delivery (buyer_id, seller_id, employee_id, origin_loc, destination, product_name, date_received) VALUES (?, ?, ?, ?, ?, ?, ?)', 
          [req.body.buyer_id, req.body.seller_id, req.body.employee_id, req.body.origin_loc, req.body.destination, req.body.product_name, req.body.date_received], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while inserting delivery: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error inserting delivery"
              })
            } else {
              res.status(200).json({
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

  // GET /employees by seller or buyer based on body parameter
  app.get('/delivery/:id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    if (!("looker_type" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `looker_type`",
      });
    }
    else{
      if (req.body.looker_type == "buyer"){
        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query('SELECT * FROM Delivery WHERE buyer_id = ?', req.params.id, function (err, rows, fields) {
              connection.release();
              if (err) {
                logger.error("Error while fetching delivery: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error obtaining delivery"
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
      else if (req.body.looker_type == "seller"){
        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query('SELECT * FROM Delivery WHERE seller_id = ?', req.params.id, function (err, rows, fields) {
              connection.release();
              if (err) {
                logger.error("Error while fetching delivery: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error obtaining delivery"
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
    }   
  });

  // PUT /delivery/:id Update a delivery at a particular id
  app.put('/delivery/:id', (req, res) => {
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    else if (!("is_delivered" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `is_delivered`",
      });
    }
    else if (!("delivered_picture" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `delivered_picture`",
      });
    }
    else if (!("flagged_for_return" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `is_flagged_for_return`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query('UPDATE Delivery SET is_delivered = ?, delivered_picture = ?, flagged_for_return = ? WHERE id = ?', [req.body.is_delivered, req.body.delivered_picture, req.body.flagged_for_return, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating delivery: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating delivery"
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


  ///////////////////////////////////SHIPPER/////////////////////////////////////////////

  //Get /shipper by username
  app.get('/shipper/:username', (req, res) => {
    if (!("username" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `username`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection');
        } else {
          connection.query('SELECT * FROM Shipper WHERE username = ?', req.params.username, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining shipper"
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

  // GET /shipper by id
  app.get('/shipper/:id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
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
          connection.query('SELECT * FROM Shipper WHERE id = ?', req.params.id, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining shipper"
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

 //Get /shipper_id by name
  app.get('/shipper/:name', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("name" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `name`",
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
          connection.query('SELECT id FROM Shipper WHERE name = ?', req.params.name, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining shipper"
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

  //////////////////////////////////////////CUSTOMER/////////////////////////////////////////////
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

  // Get /customer by username
  app.get('/customer/:username', (req, res) => {
    if (!("username" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `username`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection');
        } else {
          connection.query('SELECT * FROM Customer WHERE username = ?', req.params.username, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching customer: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining customer"
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


  //GET /customer_id by name
  app.get('/customer/:name', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("name" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `name`",
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
          connection.query('SELECT id FROM Customer WHERE name = ?', req.params.name, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching customer: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining customer"
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
 
  ////////////////////////////////////////BUYER_REVIEW///////////////////////////////////////////////////////

  // GET /buyer_review all reviews for a particular buyer
  app.get('/buyer_reviews/:company_id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("company_id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company_id`",
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
          connection.query('SELECT * FROM Buyer_Reviews WHERE buyer_company_id = ?', req.params.company_id, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching reviews for company: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining reviews for company"
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

  // POST/buyer_review/:id Leave a review for a seller company with a rating attached
  app.post('/buyer_reviews/:company_id', (req, res) => {
    if (!("company_id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company_id`",
      });
    }
    else if (!("text" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `text`",
      });
    }
    else if (!("buyer_rating" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `buyer_rating`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query(`INSERT INTO Buyer_Reviews (text, buyer_rating, buyer_company_id) 
          VALUES 
          (?, ?, ?)`, 
          [req.body.text, req.body.buyer_rating, req.params.company_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while posting review: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error posting review"
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

  // PUT /buyer_review/:id for rating a particular review as helpful or unhelpful
  app.put('/buyer_reviews/:id', (req, res) => {
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    else if (!("review_rating" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `review_rating`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query('UPDATE Buyer_Reviews SET review_rating = ? WHERE id = ?', [req.body.review_rating, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while rating review: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error rating review"
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

////////////////////////////////////////////SHIPPER_REVIEW///////////////////////////////////////////////////////

    // GET /shipper_review all reviews for a particular shipper
  app.get('/shipper_reviews/:company_id', (req, res) => {
    // obtain a connection from our pool of connections
    if (!("company_id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company_id`",
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
          connection.query('SELECT * FROM Shipper_Reviews WHERE shipper_company_id = ?', req.params.company_id, function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching reviews for company: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining reviews for company"
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

  // POST/shipper_review/:id Leave a review for a shipper company with a rating attached
  app.post('/shipper_reviews/:company_id', (req, res) => {
    if (!("company_id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `company_id`",
      });
    }
    else if (!("text" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `text`",
      });
    }
    else if (!("shipper_rating" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `shipper_rating`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query(`INSERT INTO Shipper_Reviews (text, shipper_rating, shipper_company_id) 
          VALUES 
          (?, ?, ?)`, 
          [req.body.text, req.body.shipper_rating, req.params.company_id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while posting review: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error posting review"
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

  // PUT /shipper_review/:id for rating a particular review as helpful or unhelpful
  app.put('/shipper_reviews/:id', (req, res) => {
    if (!("id" in req.params)){
      res.status(400).send({
        success: false,
        response: "Missing required field: `id`",
      });
    }
    else if (!("review_rating" in req.body)){
      res.status(400).send({
        success: false,
        response: "Missing required field in request body: `review_rating`",
      });
    }
    else{
      pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          connection.query('UPDATE Shipper_Reviews SET review_rating = ? WHERE id = ?', [req.body.review_rating, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while rating review: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error rating review"
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


  ///ROUTES FOR CREATING A NEW CUSTOMER OR SHPPER ACCOUNT

  app.post('/customer',  (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        //do not create new user if username already exists
        connection.query('SELECT * FROM Customer WHERE username = ?', req.body.username, function (err, rows, fields) {
          if (err) {
            res.status(400).send("Error while checking if username exists");

      
            // logger.error("Error while fetching user: \n", err);
            // res.status(400).json({
            //   "data": [],
            //   "error": "Error obtaining user"
            // })
          } else {
            if (rows.length > 0) {
              res.status(400).json({
                "data": [],
                "error": "Username already exists, please use a different username"
              })
            } else {
              connection.query('INSERT INTO Customer(name, email, phone, username, password) VALUES(?,?,?,?,?)', [req.body.name, req.body.email, req.body.phone, req.body.username, req.body.password], function (err, rows, fields) {
                connection.release();
                if (err) {
                  logger.error("Error while creating user: \n", err);
                  res.status(400).json({
                    "data": [],
                    "error": "Error creating user"
                  })
                } else {
                  //create token for new user
                  const token = jwt.sign({
                    id: rows.insertId,
                    username: req.body.username,
                    password: req.body.password
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: '1h'
                  });

                  res.status(200).json({
                    "data": rows,
                    "token": token
                  });
                }
              });
            }
          }
        });
      }
    });
  });


        

app.post('/shipper',  (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      //do not create new user if username already exists
      connection.query('SELECT * FROM Shipper WHERE username = ?', req.body.username, function (err, rows, fields) {
        if (err) {
          res.status(400).send("Error while checking if username exists");
          // logger.error("Error while fetching user: \n", err);
          // res.status(400).json({
          //   "data": [],
          //   "error": "Error obtaining user"
          // })
        } else {
          if (rows.length > 0) {
            res.status(400).json({
              "data": [],
              "error": "Username already exists, please use a different username"
            })
          } else {
            connection.query('INSERT INTO Shipper(name, email, phone, region, shipping_rates, fleet_size, num_deliveries, is_verified, username, password, bio) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.name, req.body.email, req.body.phone, req.body.region, req.body.shipping_rates, req.body.fleet_size, 0, false, req.body.username, req.body.password,''], function (err, rows, fields) {
              connection.release();
              if (err) {
                logger.error("Error while creating user: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error creating user"
                })
              } else {
                //create token for new user
                const token = jwt.sign({
                  id: rows.insertId,
                  username: req.body.username,
                  password: req.body.password
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '1h'
                });

                res.status(200).json({
                  "data": rows,
                  "token": token
                });
              }
            });
          }
        }
      });
    }
  });
});




//put route for updating shipping rates or fleet size, or bio, or num deliveries
app.put('/shipper/:username', (req, res) => {
  if (!("username" in req.params)){
    res.status(400).send({
      success: false,
      response: "Missing required field: `username`",
    });
  }
  else{
    pool.getConnection(function (err, connection){
      if(err){
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        if("shipping_rates" in req.body && "fleet_size" in req.body && "bio" in req.body && "num_deliveries" in req.body){
          connection.query('UPDATE Shipper SET shipping_rates = ?, fleet_size = ?, bio = ?, num_deliveries = ? WHERE username = ?', [req.body.shipping_rates, req.body.fleet_size, req.body.bio, req.body.num_deliveries, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating shipper"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
        else if("shipping_rates" in req.body && "fleet_size" in req.body && "bio" in req.body){
          connection.query('UPDATE Shipper SET shipping_rates = ?, fleet_size = ?, bio = ? WHERE username = ?', [req.body.shipping_rates, req.body.fleet_size, req.body.bio, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating shipper"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
        else if("shipping_rates" in req.body && "fleet_size" in req.body){
          connection.query('UPDATE Shipper SET shipping_rates = ?, fleet_size = ? WHERE username = ?', [req.body.shipping_rates, req.body.fleet_size, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating shipper: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating shipper"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
         else if("shipping_rates" in req.query){
          connection.query('UPDATE Shipper SET shipping_rates = ? WHERE username = ?', [req.body.shipping_rates, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating shipping rates: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating shipping rates"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }else if("fleet_size" in req.query){
          connection.query('UPDATE Shipper SET fleet_size = ? WHERE username = ?', [req.body.fleet_size, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating fleet size: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating fleet size"
              })

            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        } 
        else if("bio" in req.query){
          connection.query('UPDATE Shipper SET bio = ? WHERE username = ?', [req.body.bio, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating bio: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating bio"
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
        else if("num_deliveries" in req.query){
          connection.query('UPDATE Shipper SET num_deliveries = ? WHERE username = ?', [req.body.num_deliveries, req.params.username], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while updating num deliveries: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error updating num deliveries"
                //"error": err
              })
            } else {
              res.status(200).json({
                "data": rows
              });
            }
          });
        }
      };
    });
  }
});
//Mark a shipper for is_verified
app.put('/shipper/:id/verify', (req, res) => {
  if (!("id" in req.params)){
    res.status(400).send({
      success: false,
      response: "Missing required field: `id`",
    });
  }
  else{
    pool.getConnection(function (err, connection){
      if(err){
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        //if the shipper has over 50 num_deliveries, they are verified
        connection.query('UPDATE Shipper SET is_verified = 1 WHERE id = ? AND num_deliveries >= 50', [req.params.id], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while updating shipper: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error updating shipper"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
            console.log(req.params.username + " is now verified");
          }
        });
      };
    });
  }
});

//BELOW ARE NOT NECESSARY FOR USER STORIES  VVVV

//Delete a customer by name
app.delete('/customer/:username', (req, res) => {
  if (!("username" in req.params)){
    res.status(400).send({
      success: false,
      response: "Missing required field: `username`",
    });
  }
  else{
    pool.getConnection(function (err, connection){
      if(err){
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        connection.query('DELETE FROM Customer WHERE username = ?', [req.params.username], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while deleting customer: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error deleting customer"
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
}
