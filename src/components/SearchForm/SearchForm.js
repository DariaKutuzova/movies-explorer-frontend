import './SearchForm.css';
import '../App/App.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {

    return (
        <div className="app__container">
        <form action="" method="get" className="search-form app__container">
            <div className="search-form__container">
            <input className="search-form__input" name="search" placeholder="Фильм" type="search"/>
            <button className="search-form__button" type="submit"/>
            </div>
            <FilterCheckbox/>
        </form>
        </div>
    );
}

export default SearchForm;
