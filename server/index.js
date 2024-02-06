require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger');
const axios = require('axios');
const { generateFoodPlan } = require('./utils/helperFunctions');

app.use(cors());
app.use(express.json()); // middleware for parsing request body
app.use(logger); // middleware for logging requests


app.get("/", function (req, res) {
  res.send("Hello from the server!");
});

// main route for AI generated food plan
app.post("/api/food-plan", function (req, res) {
  res.json(req.body);
})

// start the server listening for requests
app.listen(process.env.PORT,
  () => console.log(`Server is running at PORT: ${process.env.PORT}`));