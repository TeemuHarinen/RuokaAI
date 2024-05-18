require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger');
const { generateFoodPlan } = require('./utils/helperFunctions');

app.use(cors());
app.use(express.json()); // middleware for parsing request body
app.use(logger);

app.get("/", function (req, res) {
    res.send("Hello from the server!");
});


app.post("/api/food-plan", async (req, res, next) => {
  try {
    const { calories, weightGoal } = req.body;
    const foodPlan = await generateFoodPlan(calories, weightGoal);
    res.json({ message: 'Food plan generated successfully', foodPlan: foodPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// start the server listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));