const basicAuth = require('express-basic-auth')
const {check,validationResult} = require('express-validator')


const express = require("express");
const app = express();

// our airports json
const airports = require("./airports.json");

const users = require("./users.json");

// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// swagger config
const swaggerOptions = require("./openapi");

// parse req body
app.use(express.json());

a = airports.length
console.log(a)

/*
app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}))
*/

//console.log(airports[0].name)
/*
for (i = 0; i< a; i++) {
  console.log(airports[i].name)
}
*/
/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management
 *
 */

/**
 * @swagger
 * /airports:
 *   get:
 *    description: The airports route
 *
 */

app.get("/airports", (req, res) => {
  res.send(airports);
  console.log("airport list displayed")
});


//basic post
app.post("/airports", 
check("name","name must be a string").isString().isLength({ min: 5 }),
(req,res) => {
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(500).json({ errors: errors.array() });
        }

  res.send('Posted!')
  console.log("Basic Post")
});


// basic delete
app.delete("/airports", (req,res) => {
  res.send('Deleted!')
  console.log("Basic Delete")
});

/*
app.get("/airports/:name", (req,res) => {
  console.log(req.params['name']+" get name id");
  res.send(req.params['name']);
 
  if (req.params['name'] == "abc") {
    console.log("Wow!")
  }
 // res.send("test"+req.params.name)
});
*/



//gets country of airport
app.get("/airports/:name", 
(req,res) => {
  console.log(req.params['name']+"   is a get request");
  for (i = 0; i< a; i++) {

    if (airports[i].name == req.params['name']) {
       console.log(airports[i].country+" "+airports[i].state)
    
    res.status(201).send(airports[i].country+" "+airports[i].state)

    break;
  }
  //res.send(req.params['name']);
 
  }
 // res.send("test"+req.params.name)
 //res.sendStatus(201)
 //res.status(201).end()
});



app.put("/airports/:name",(req,res) => {
  console.log(req.params['name'+ " update/replace name id"]);
  res.send(req.params['name']);

});

/*
app.get("/airports/:name", (req,res) => {
  const { name } = req.params
  console.log(name);
  res.send();
 // res.send("test"+req.params.name)
});
*/
/*
if (req.response.name = "123") {
  res.send("Wow!")
}
*/
/*
req.params: { "name" }
app.get("/airports/:name",(req,res) => {
  res.send(req.params);
});
*/

//post
//delete
//airport with id

const bcrypt = require('bcrypt')
bcrypt.hash('password101', 10).then(console.log)

bcrypt.compare('password101', '$2b$10$AQXoVkfzAovJ9RHTtmd6N.Yegy3V9ALTlYDcCM76HxBqq044q6xLK').then(console.log)





/*
const { body, validationResult } = require('express-validator');

username='Fox'
password='ABC555'

app.post(
  '/users',
  // username must be an email
  body(username).isEmail(),
  // password must be at least 5 chars long
  body(password).isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(users => res.json(users));
  },
);

*/


 

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;
