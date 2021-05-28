import React, { useState } from 'react'

const Form = ({ toggleForm }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [isWeekday, setIsWeekday] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMeal = { name, ingredients, isWeekday };
        fetch('http://localhost:8000/data/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMeal)
        }).then(toggleForm())
    };

    const ingredientsToArray = (ingredientsText) => {
        let ingr = ingredientsText.split(', ');
        setIngredients(ingr);
    };
    return (
        <div className="newMealFormContainer">
            <div className="newMealForm">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Meal Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => (setName(e.target.value))}
                    />
                    <label>Ingredients</label>
                    <input
                        type="text"
                        onChange={(e) => (ingredientsToArray(e.target.value))}
                    />
                    <label>When</label>
                    <select
                        value={isWeekday}
                        onChange={(e) => (setIsWeekday(parseInt(e.target.value), 10))}
                    >
                        <option value="1">Weekday</option>
                        <option value="0">Weekend</option>
                    </select>
                    <button>Add</button>
                </form>

            </div>
        </div>
    )
}

export default Form
