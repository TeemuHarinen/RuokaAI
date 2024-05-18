// helperFunctions.js

const axios = require('axios');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFoodPlan(calories, weightGoal) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to create a food plan for the user.",
        },
        {
          role: "user",
          content: `Generate a food plan based of daily calorie amount ${calories} + 500 cal and a weight goal of ${weightGoal}. Answer in JSON.`,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating food plan:', error);
    throw error;
  }
}

module.exports = {
  generateFoodPlan
};