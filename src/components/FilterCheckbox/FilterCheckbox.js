import './FilterCheckbox.css';
import '../App/App.css'
import {useState} from "react";


function FilterCheckbox({onCheckboxShorts, storageEnabled}) {

    const defaultChecked = storageEnabled ? localStorage.getItem("checkbox")==="true" || false : false;
    const [checkedShorts, setCheckedShorts] = useState(defaultChecked);

    function changeCheckboxShorts(e) {
        let newState = e.target.checked;

        setCheckedShorts(newState);
        onCheckboxShorts(newState);

        if (storageEnabled)
            localStorage.setItem('checkbox', newState);
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
