import './FilterCheckbox.css';
import '../App/App.css'
import {useState} from "react";

function FilterCheckbox(onCheckboxShorts) {

    const [checkedShorts, setCheckedShorts] = useState(false);

    function changeCheckboxShorts(e) {
        let newState = {
            ...checkedShorts,
            [e.target.name]: e.target.checked
        };
        setCheckedShorts(!checkedShorts);
        onCheckboxShorts(newState)
    }

    return (

        <div className="filter-checkbox">
                <input className="filter-checkbox__input" type="checkbox" id="cbx"
                       onChange={changeCheckboxShorts} />
                <label htmlFor="cbx" className="filter-checkbox__description">
                        Короткометражки
                </label>
        </div>
    );
}

export default FilterCheckbox;
