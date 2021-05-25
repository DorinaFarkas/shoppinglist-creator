
const SelectDay = ({ nextStep, selecWeekday, selecWeekend, weekdayChecked, weekendChecked }) => {

    return (
        <div>
            <div className='card'>
                <h2>What days are you plannig for?</h2>
                <div className='card-list'>
                    <div className='card-list-item'>
                        <label htmlFor='weekday'>Weekdays</label>
                        <input
                            required="required"
                            id='weekday'
                            name="weekday"
                            type="checkbox"
                            checked={weekdayChecked ? true : false}
                            onChange={() => selecWeekday()} />
                    </div>
                    <div className='card-list-item'>
                        <label htmlFor='weekend'>Weekend</label>
                        <input
                            required
                            id='weekend'
                            name="weekend"
                            type="checkbox"
                            checked={weekendChecked ? true : false}
                            onChange={() => selecWeekend()} />
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className='buttonNext' onClick={() => nextStep()}>NEXT</button>
                </div>
            </div>

        </div>
    )
}

export default SelectDay
