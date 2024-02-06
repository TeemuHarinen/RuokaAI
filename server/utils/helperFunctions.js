
// Change API to GPT-4 API!!

// Helper functions to make API requests to OpenAI's GPT-3 API
async function generateFoodPlan() {
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: 'Generate a one week healthy food plan',
    max_tokens: 200
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // API key stored in .env file
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].text;
}

module.exports = {
  generateFoodPlan
};