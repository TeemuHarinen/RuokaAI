/* eslint-disable react/prop-types */

import { useState } from 'react';
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
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [weightGoal, setWeightGoal] = useState('');
  const [foodPlan, setFoodPlan] = useState(null);
  const [allergens, setAllergens] = useState([]);
  const [newAllergen, setNewAllergen] = useState('');

  const addNewAllergen = () => {
    if (newAllergen.trim() !== '') { // prevent empty allegens from being added
        setAllergens([...allergens, newAllergen]);
        setNewAllergen('');
      }
  };

  const calculateCalories = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else  {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return bmr * activityLevel;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var calories = calculateCalories() // round to nearest whole number
    calories = Math.round(calories);
    try {
      console.log('calories:', calories);
      console.log('weightGoal:', weightGoal);
      const response = await axios.post('http://localhost:3001/api/food-plan', { calories, weightGoal, allergens: allergens.join(',') });
      const parsedJson = JSON.parse(response.data.foodPlan);
      console.log('parsedJson:', parsedJson);
      setFoodPlan(parsedJson);
    } catch (error) {
      console.error('Error generating food plan:', error);
    }
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '1em',
    boxSizing: 'border-box',
  };

  const inputStyle = {
    padding: '0.5em',
    fontSize: '1em',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '0.5em 1em',
    fontSize: '1em',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', 
  };

  const radioStyle = {
    display: 'flex',
    gap: '1em',
  };

  const headingStyle = {
    textAlign: 'center',
    margin: '0'
  };

  const tableStyle = {
    marginTop: '2em', // add some space above the table
    borderCollapse: 'collapse', // collapse borders into a single line
    width: '100%', // make the table take up the full width of its container
    borderRadius: '0.5em'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overFlowY: 'auto',
    };

  const allergenStyle = {
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: 'lightgreen',
    padding: '5px',
    margin: '5px',
    color: 'black',
    fontSize: '14px',
  };


  return (
    <div style={{containerStyle}}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={headingStyle}>Food Plan Generator</h1>
        <h5 style={headingStyle}> Created by Teemu Harinen</h5>
        <h4 style={{headingStyle, fontStyle:'italic'}}>Enter your information below to generate a food plan</h4>
        <label style={labelStyle}>
          Weight (in kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Height (in cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} required style={inputStyle}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label style={labelStyle}>
          Activity Level:
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required style={inputStyle}>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
            <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
            <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
            <option value="1.9">Extra active (very hard exercise/physical job & exercise)</option>
          </select>
        </label>
        <label style={labelStyle}>
        Allergens:
            <input type="text" value={newAllergen} onChange={(e) => setNewAllergen(e.target.value)} style={inputStyle} />
            <button type="button" onClick={addNewAllergen}>Add</button>
        </label>
        <ul style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {allergens.map((allergen, index) => (
            <li key={index} style={allergenStyle}>
            {allergen}
            </li> ))}
        </ul>
        <label style={labelStyle}>
          Weight Goal:
          <label style={{radioStyle}}>
            <input type="radio" value="lose" checked={weightGoal === 'lose'} onChange={(e) => setWeightGoal(e.target.value)} required />
            Lose
          </label>
          <label style={{radioStyle}}>
            <input type="radio" value="gain" checked={weightGoal === 'gain'} onChange={(e) => setWeightGoal(e.target.value)} required />
            Gain
          </label>
        </label>
        <button type="submit" style={buttonStyle}>Generate Food Plan</button>
      </form>
      {foodPlan && <FoodPlanTable style={tableStyle}foodPlan={foodPlan.food_plan} total={foodPlan.total} />}
    </div>
  );
};

export default Home;
