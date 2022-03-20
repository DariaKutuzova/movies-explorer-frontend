import './FilterCheckbox.css';
import '../App/App.css'
import {useState} from "react";

function FilterCheckbox({onCheckboxShorts}) {

    const [checkedShorts, setCheckedShorts] = useState(false);

    function changeCheckboxShorts(e) {
        let newState = e.target.checked;

        setCheckedShorts(newState);
        onCheckboxShorts(newState)
    }

    return (

        <div className="filter-checkbox">
                <input className="filter-checkbox__input" type="checkbox" id="cbx"
                       onChange={changeCheckboxShorts}
                       checked={checkedShorts}/>
                <label htmlFor="cbx" className="filter-checkbox__description">
                        Короткометражки
                </label>
        </div>
    );
}

export default FilterCheckbox;
