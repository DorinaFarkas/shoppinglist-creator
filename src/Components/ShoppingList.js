import React, { useEffect } from 'react'

const ShoppingList = ({ prevStep, removeItem, uniqueIngr, createShoppingList }) => {
   useEffect(()=>{
    createShoppingList()
   },[])

    const copyList = () => {
        let listText = uniqueIngr.toString().split(',').join("\r\n");
        navigator.clipboard.writeText(listText);
    }

    return (
        <div className='card' id='ShoppingList'>
            <h2>Shopping List</h2>
            <div className='card-list'>
                {uniqueIngr.map((ingredient, index) => (
                    <div className='card-list-item' key={index}>
                        <span>
                            {ingredient}
                        </span>
                        <button onClick={() => (removeItem(index, 1))}>&#10006;</button>
                    </div>
                ))}
            </div>
            <div className="button-wrapper">
                <button className='buttonNext' onClick={() => copyList()}>COPY</button>
                <br />
                <button className='buttonNext' onClick={() => prevStep()}>BACK</button>
            </div>
        </div>
    )
}

export default ShoppingList
