import React, { useEffect, useState } from 'react';
import FoodList from './FoodList';
import SelectDay from './SelectDay';
import ShoppingList from './ShoppingList';


const FoodData = () => {
    const [step, setStep] = useState(1);
    const [weekdayChecked, setWeekdayChecked] = useState(false);
    const [weekendChecked, setWeekendChecked] = useState(false);
    const [mealsData, setMealsData] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState([]);

    const handleClickAdd = (e, meal) => {
        setSelectedMeals(selectedMeals => [...selectedMeals, meal]);
        e.target.style.color = '#6285d6'
    }

    const nextStep = () => {
        let next = step + 1;
        setStep(next);
        console.log(step);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const selecWeekday = () => {
        weekdayChecked === false ? setWeekdayChecked(true) : setWeekdayChecked(false);
    }
    const selecWeekend = () => {
        weekendChecked === false ? setWeekendChecked(true) : setWeekendChecked(false);
    }

    useEffect(() => {
        fetch('http://localhost:8000/data/')
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => setMealsData(response));
    }, []);

    return (
        <div>
            Meal planner
            {step === 1 ? (
                mealsData && <SelectDay nextStep={nextStep} selecWeekday={selecWeekday} selecWeekend={selecWeekend} weekdayChecked={weekdayChecked} weekendChecked={weekendChecked}/>
            ) : step === 2 ? (
                <FoodList meals={mealsData} nextStep={nextStep} prevStep={prevStep} weekdayChecked={weekdayChecked} weekendChecked={weekendChecked} handleClickAdd={handleClickAdd}/>
            ) : step === 3 ? (
                <ShoppingList prevStep={prevStep} meals={selectedMeals} />
            ) : ''
            }
        </div>
    )
}

export default FoodData
