import './SearchForm.css';
import '../App/App.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useState} from 'react';


function SearchForm({onCheckboxShorts, onSearch}) {

    const [inputValue, setInputValue] = useState(localStorage.getItem("searchWord") || '');

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onSearch(inputValue);
        localStorage.setItem('searchWord', inputValue);

    }

    function checkInputValue(e) {

        if (e.target.value==='') {
            e.target.setCustomValidity("Нужно ввести ключевое слово");
        } else {
            e.target.setCustomValidity("");
        }

        setInputValue(
            e.target.value
        )
    }

    return (
        <div className="app__container">
        <form action="" method="get" className="search-form app__container"  onSubmit={handleSubmit}>
            <div className="search-form__container">
            <input className="search-form__input" name="search" placeholder="Фильм" type="search"
                   onChange={checkInputValue}
                   onFocus={checkInputValue}
                   value={inputValue}
                   required/>
            <button className="search-form__button" type="submit"/>
            </div>
            <FilterCheckbox
                onCheckboxShorts={onCheckboxShorts}/>
        </form>
        </div>
    );
}

export default SearchForm;
