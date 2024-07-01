// helperFunctions.js
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFoodPlan(calories, weightGoal, allergens) {
  calories = parseInt(calories);
  let adjustedCalories = weightGoal === 'lose' ? calories - 500 : weightGoal === 'gain' ? calories + 500 : calories;
  console.log('adjustedCalories:', adjustedCalories)
  try {
    const allergensString = allergens.length > 0 ? `Avoid the following allergens: ${allergens}.` : '';
    console.log('allergensString:', allergensString)
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to create a food plan for the user.",
        },
        {
          role: "user",
          content: `Generate a food plan for a human that is ${adjustedCalories} calories and is allergic to ${allergensString}. The food plan needs to have macros and calories listed for each meal.
          Each meal needs to have ingredients and short instructions. There needs to be exactly 4 meals: breakfast, lunch, dinner and evening meal.
          Prioritise high protein. Prioritize recipes commonly eaten in Finland. Dont specify "Finnish" in the response meal name. Also include a total count of days calories and macros combined at the end.
          JSON field values should be in Finnish. Answer in only JSON. Follow this JSON structure: {
            "food_plan": {
              "breakfast": {
                "meal": "",
                "calories": "",
                "macros": {
                  "protein": "",
                  "carbs": "",
                  "fat": ""
                },
                "ingredients": "",
                "instructions": ""
              },
              "lunch": {
                "meal": "",
                "calories": "",
                "macros": {
                  "protein": "",
                  "carbs": "",
                  "fat": ""
                },
                ingredients: "",
                instructions: ""
              },
              "dinner": {
                "meal": "",
                "calories": "",
                "macros": {
                  "protein": "",
                  "carbs": "",
                  "fat": ""
                },
                ingredients: "",
                instructions: ""
              },
              "evening_meal": {
                "meal": "",
                "calories": "",
                "macros": {
                  "protein": "",
                  "carbs": "",
                  "fat": ""
                },
                ingredients: "",
                instructions: ""
              }
            },
            "total": {
              "calories": "",
              "macros": {
                "protein": "",
                "carbs": "",
                "fat": ""
              }
            }
          } AT THE END MAKE SURE THE CALORIES AND MACROS ADD UP TO THE TOTALS. AND MAKE SURE INGREDIDIENT AMOUNTS MATCH THE CALORIES AND MACROS.`,
        },
      ],
      model: "gpt-4o",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });
    const foodPlan = completion.choices[0].message.content;
    console.log('foodPlan:', foodPlan);
    return foodPlan
  } catch (error) {
    console.error('Error generating food plan:', error);
    throw error;
  }
}

module.exports = {
  generateFoodPlan
};