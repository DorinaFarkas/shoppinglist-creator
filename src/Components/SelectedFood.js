import React from 'react'

const SelectedFood = ({ selectedMeals }) => {
    return (
        <p>
            {selectedMeals.map(meal => (
                <span key={meal.id}> {meal.name},</span>
            ))}
        </p>
    )
}

export default SelectedFood
