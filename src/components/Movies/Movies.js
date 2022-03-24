import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useState} from "react";

function Movies({addMovies, onSaveMovie, filterMovies, filterShorts, sliceMovies}) {

    const [startState, setStartState] = useState(true);

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [finalMovies, setFinalMovies] = useState([]);
    const [slicedMovies, setSlicedMovies] = useState([]);
    const [slice, setSlice] = useState(4)

    const setMovies = (value) => {
        setFilteredMovies(filterMovies(value))
        setFinalMovies(filterMovies(value))
        setStartState(false)
    }

    const filterShortMovies = (value) => {
        if (value) {
            setFinalMovies(filterShorts(filteredMovies))
        } else setFinalMovies(filteredMovies)
    }

    const sliceMoviesArray = () => {
        setSlicedMovies(sliceMovies(finalMovies,slice))
    }

    return (
        <div>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={filterShortMovies}
                    onSearch={setMovies}/>
                <MoviesCardList
                    movies={finalMovies}
                    startState={startState}
                    onSaveMovie={onSaveMovie}/>
                <MoreMovies
                    movies={finalMovies}
                    addMovies={addMovies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
