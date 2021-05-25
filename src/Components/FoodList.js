import React from 'react'

const FoodList = ({ meals, nextStep, prevStep, weekdayChecked, weekendChecked, handleClickAdd }) => {

    return (
        <div>
            <div className='card'>
                <h2>Meal options:</h2>
                <div className='card-list'>
                    {(weekdayChecked) ? (
                        meals.map(meal => (
                            (meal.isWeekday === 1) ? (
                                < div className='card-list-item' key={meal.id} >
                                    <span>{meal.name}</span>
                                    <button onClick={(e) => (handleClickAdd(e, meal))}>&#10010;</button>
                                </div>
                            ) : ''
                        ))
                    ) : ''}
                    {(weekendChecked) ? (
                        meals.map(meal => (
                            (meal.isWeekday === 0) ? (
                                < div className='card-list-item' key={meal.id} >
                                    <span>{meal.name}</span>
                                    <button onClick={(e) => (handleClickAdd(e, meal))}>&#10010;</button>
                                </div>
                            ) : ''
                        ))
                    ) : ''
                    }
                </div>
                <div className="button-wrapper">
                    <button className='buttonNext' onClick={() => nextStep()}>NEXT</button>
                    <br />
                    <button className='buttonNext' onClick={() => prevStep()}>BACK</button>
                </div>
            </div>


        </div >
    )
}

export default FoodList
