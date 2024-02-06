import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [formState, setFormState] = useState({
    calories: '',
    weightGoal: ''
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Calories: ${formState.calories}, Weight Goal: ${formState.weightGoal}`);

    try {
      const response = await axios.post('http://localhost:3001/api/food-plan', formState);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Fill the form to get recommended food plan</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Calories:
          <input type="number" name="calories" value={formState.calories} onChange={handleChange} />
        </label>
        <br />
        <label>
          Weight goal:
          <br />
          <label>
            <input type="radio" name="weightGoal" value="lose" checked={formState.weightGoal === 'lose'} onChange={handleChange} />
            Lose weight
          </label>
          <label>
            <input type="radio" name="weightGoal" value="maintain" checked={formState.weightGoal === 'maintain'} onChange={handleChange} />
            Maintain current weight
          </label>
          <label>
            <input type="radio" name="weightGoal" value="gain" checked={formState.weightGoal === 'gain'} onChange={handleChange} />
            Gain weight
          </label>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
