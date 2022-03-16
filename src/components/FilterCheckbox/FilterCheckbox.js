import './FilterCheckbox.css';
import '../App/App.css'

function FilterCheckbox() {

    return (

        <div className="filter-checkbox">
                <input className="filter-checkbox__input" type="checkbox" id="cbx"/>
                <label htmlFor="cbx" className="filter-checkbox__description">
                        Короткометражки
                </label>
        </div>
    );
}

export default FilterCheckbox;
