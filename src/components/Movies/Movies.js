import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useState} from "react";

function Movies({addMovies, startState, onSaveMovie, filterMovies, filterShorts}) {

    const [filteredMovies, setFilteredMovies] = useState([]);
    // const [shortState, setShortState] = useState([]);
    const [finalMovies, setFinalMovies] = useState([]);

    const setMovies = (value) => {
        setFilteredMovies(filterMovies(value))
        setFinalMovies(filterMovies(value))
    }

    const filterShortMovies = (value) => {
        if (value) {
            setFinalMovies(filterShorts(filteredMovies))
        } else setFinalMovies(filteredMovies)
    }

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={filterShortMovies}
                    onSearch={setMovies}/>
                <MoviesCardList
                    movies={finalMovies}
                    startState={startState}
                    onSaveMovie={onSaveMovie}/>
                <MoreMovies
                    movies={filteredMovies}
                    addMovies={addMovies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
