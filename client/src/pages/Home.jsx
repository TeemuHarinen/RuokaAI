import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [calories, setCalories] = useState('');
    const [weightGoal, setWeightGoal] = useState('');
    const [foodPlan, setFoodPlan] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/food-plan', { calories, weightGoal });
            setFoodPlan(response.data.foodPlan);
        } catch (error) {
            console.error('Error generating food plan:', error);
        }
    };

    return (
        <div>
            <h1>Food Plan Generator</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Calories:
                    <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
                </label>
                <br />
                <label>
                    Weight Goal:
                    <input type="text" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Generate Food Plan</button>
            </form>
            {foodPlan && (
                <div>
                    <h2>Generated Food Plan</h2>
                    <p>{foodPlan}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
