// helperFunctions.js

const axios = require('axios');
const { json } = require('express');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFoodPlan(calories, weightGoal) {
  adjustedCalories = weightGoal === 'lose' ? calories = calories-500 : weightGoal === 'gain' ? calories = calories+500: calories;
  console.log('adjustedCalories:', adjustedCalories)
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to create a food plan for the user.",
        },
        {
          role: "user",
          content: `Generate a food plan for a human that is ${adjustedCalories} calories. The food plan needs to have macros and calories listed for each meal. There needs to be exactly 4 meals: breakfast, lunch, dinner and evening meal. Prioritise high protein.Also include a total count of days calories and macros combined at the end. Answer in only JSON.`,
        },
      ],
      model: "gpt-4o",
      temperature: 0,
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message);
    const foodPlan = completion.choices[0].message.content;

    return foodPlan
  } catch (error) {
    console.error('Error generating food plan:', error);
    throw error;
  }
}

module.exports = {
  generateFoodPlan
};