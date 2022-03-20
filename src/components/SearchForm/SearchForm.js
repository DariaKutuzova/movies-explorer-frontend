import './SearchForm.css';
import '../App/App.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useState} from 'react';

function SearchForm({onCheckboxShorts}) {

    const [checkedShorts, setCheckedShorts] = useState(false);

    function changeCheckboxShorts(e) {
        let newState = {
            ...checkedShorts,
            [e.target.name]: e.target.checked
        };
        setCheckedShorts(newState);
        onCheckboxShorts(newState)
    }

    return (
        <div className="app__container">
        <form action="" method="get" className="search-form app__container">
            <div className="search-form__container">
            <input className="search-form__input" name="search" placeholder="Фильм" type="search"
                   onChange={changeCheckboxShorts} required/>
            <button className="search-form__button" type="submit"/>
            </div>
            <FilterCheckbox/>
        </form>
        </div>
    );
}

export default SearchForm;
