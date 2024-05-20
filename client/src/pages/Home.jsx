/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import axios from 'axios';


const FoodPlanTable = ({ foodPlan, total }) => {
  console.log('food plan:', foodPlan)
  if (!foodPlan) {
      return null;
  }

  console.log('food plan', foodPlan)
  return (
      <div>
          <h1>Food Plan</h1>
          <table border="1">
              <thead>
                  <tr>
                      <th>Meal</th>
                      <th>Meal Description</th>
                      <th>Calories</th>
                      <th>Protein (g)</th>
                      <th>Carbs (g)</th>
                      <th>Fat (g)</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Breakfast</td>
                      <td>{foodPlan.breakfast.meal}</td>
                      <td>{foodPlan.breakfast.calories}</td>
                      <td>{foodPlan.breakfast.macros.protein}</td>
                      <td>{foodPlan.breakfast.macros.carbs}</td>
                      <td>{foodPlan.breakfast.macros.fat}</td>
                  </tr>
                  <tr>
                      <td>Lunch</td>
                      <td>{foodPlan.lunch.meal}</td>
                      <td>{foodPlan.lunch.calories}</td>
                      <td>{foodPlan.lunch.macros.protein}</td>
                      <td>{foodPlan.lunch.macros.carbs}</td>
                      <td>{foodPlan.lunch.macros.fat}</td>
                  </tr>
                  <tr>
                      <td>Dinner</td>
                      <td>{foodPlan.dinner.meal}</td>
                      <td>{foodPlan.dinner.calories}</td>
                      <td>{foodPlan.dinner.macros.protein}</td>
                      <td>{foodPlan.dinner.macros.carbs}</td>
                      <td>{foodPlan.dinner.macros.fat}</td>
                  </tr>
                  <tr>
                      <td>Evening Meal</td>
                      <td>{foodPlan.evening_meal.meal}</td>
                      <td>{foodPlan.evening_meal.calories}</td>
                      <td>{foodPlan.evening_meal.macros.protein}</td>
                      <td>{foodPlan.evening_meal.macros.carbs}</td>
                      <td>{foodPlan.evening_meal.macros.fat}</td>
                  </tr>
                  <tr>
                      <td>Total</td>
                      <td></td>
                      <td>{total.calories}</td>
                      <td>{total.macros.protein}</td>
                      <td>{total.macros.carbs}</td>
                      <td>{total.macros.fat}</td>

                  </tr>
              </tbody>

          </table>
      </div>
  );
};

const Home = () => {
  const [calories, setCalories] = useState(0);
  const [weightGoal, setWeightGoal] = useState('');
  const [foodPlan, setFoodPlan] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3001/api/food-plan', { calories, weightGoal });
          const parsedJson = JSON.parse(response.data.foodPlan);
          console.log('parsedJson:', parsedJson);
          setFoodPlan(parsedJson);
      } catch (error) {
          console.error('Error generating food plan:', error);
      }
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <label>
                  Calories:
                  <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
              </label>
              <br />
              <label>
                  Weight Goal:
                  <label>
                      <input type="radio" value="lose" checked={weightGoal === 'lose'} onChange={(e) => setWeightGoal(e.target.value)} required />
                      Lose
                  </label>
                  <label>
                      <input type="radio" value="gain" checked={weightGoal === 'gain'} onChange={(e) => setWeightGoal(e.target.value)} required />
                      Gain
                  </label>
              </label>
              <br />
              <button type="submit">Generate Food Plan</button>
          </form>
          {foodPlan && <FoodPlanTable foodPlan={foodPlan.food_plan} total={foodPlan.total} />}
      </div>
  );
};

export default Home;
