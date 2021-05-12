const express = require("express");
const app = express();

// our airports json
const airports = require("./airports.json");

// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// swagger config
const swaggerOptions = require("./openapi");

// parse req body
app.use(express.json());

a = airports.length
console.log(a)

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
app.post("/airports", (req,res) => {
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
app.get("/airports/:name", (req,res) => {
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


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;
