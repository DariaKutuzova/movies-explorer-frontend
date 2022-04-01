import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";
import {useState} from "react";

function SavedMovies({filterMovies, filterShorts, onDeleteMovie, cards}) {

    const [searchValue, setSearchValue] = useState("");
    const [isShortMovies, setIsShortMovies] = useState(false);

    let finalMovies = filterShorts(filterMovies(cards, searchValue), isShortMovies);

    const setMovies = (value) => {
        setSearchValue(value)
    }

    const filterShortMovies = (value) => {
        setIsShortMovies(value)
    }

    return (
        <div>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={filterShortMovies}
                    onSearch={setMovies}/>
                <MoviesCardList
                    movies={finalMovies}
                    onDeleteMovie={onDeleteMovie}/>
            </div>
            <Footer/>
        </div>
    );
}

export default SavedMovies;
