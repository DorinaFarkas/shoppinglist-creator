import React, { useEffect, useState } from 'react';
import FoodList from './FoodList';
import Form from './Form';
import SelectDay from './SelectDay';
import ShoppingList from './ShoppingList';


const FoodData = () => {
    const [step, setStep] = useState(1);
    const [weekdayChecked, setWeekdayChecked] = useState(false);
    const [weekendChecked, setWeekendChecked] = useState(false);
    const [mealsData, setMealsData] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [uniqueIngr, setUniqueIngr] = useState([]);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/data/')
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => setMealsData(response));

    }, []);

    const handleClickAdd = (e, meal) => {
        if (selectedMeals.includes(meal)) {
            e.target.style.color = '';
            let arr = selectedMeals;
            for (var i = 0; i < selectedMeals.length; i++) {
                if (selectedMeals[i] === meal) {
                    arr.splice(i, 1);
                }
            }
            setSelectedMeals(arr);

        } else {
            setSelectedMeals(selectedMeals => [...selectedMeals, meal]);
            e.target.style.color = '#6285d6';
        }
    }

    const toggleForm = () => {
        !formOpen ? setFormOpen(true) : setFormOpen(false)
    }

    const matchSelectedMeal = () => {
        let spans = document.querySelectorAll('.card-list-item span')
        Array.from(spans).map(span => (
            selectedMeals.map(meal => (
                span.innerHTML === meal.name ? (
                    span.nextElementSibling.style.color = '#6285d6'
                ) : ''
            ))
        ))
    }

    const createShoppingList = () => {
        let ingrArrays = selectedMeals.map(meal => (
            meal.ingredients.map(ingredient => (
                ingredient
            ))
        ))

        let mergedIngr = [].concat.apply([], ingrArrays);
        setUniqueIngr(mergedIngr.filter((value, index) => mergedIngr.indexOf(value) === index));
    }


    const removeItem = (index) => {
        let Arr = uniqueIngr.filter((item, i) => (i !== index))
        setUniqueIngr(Arr);
    }

    const nextStep = () => {
        let next = step + 1;
        setStep(next);
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


    return (
        <div>
            Meal planner
            <button 
            onClick={() => (toggleForm())}
            >ADD NEW MEAL</button>
            {step === 1 ? (
                mealsData && <SelectDay
                    nextStep={nextStep}
                    selecWeekday={selecWeekday}
                    selecWeekend={selecWeekend}
                    weekdayChecked={weekdayChecked}
                    weekendChecked={weekendChecked} />
            ) : step === 2 ? (
                <FoodList
                    meals={mealsData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    weekdayChecked={weekdayChecked}
                    weekendChecked={weekendChecked}
                    selectedMeals={selectedMeals}
                    matchSelectedMeal={matchSelectedMeal}
                    handleClickAdd={handleClickAdd} />
            ) : step === 3 ? (
                <ShoppingList
                    prevStep={prevStep}
                    removeItem={removeItem}
                    uniqueIngr={uniqueIngr}
                    createShoppingList={createShoppingList} />
            ) : ''
            }
            { formOpen && <Form toggleForm={toggleForm} /> }
        </div>
    )
}

export default FoodData
