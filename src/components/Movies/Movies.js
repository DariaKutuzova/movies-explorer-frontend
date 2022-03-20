import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useState} from "react";

// import {movies} from "../../utils/constants";

function Movies({onCheckboxShorts, addMovies, startState, onSaveMovie, onSearch, cards, filterMovies}) {

    const [filteredMovies, setFilteredMovies] = useState([]);

    // const filterMovies = (value) => {
    //     setFilteredMovies(cards.filter(movie => {
    //         return movie.nameRU.toLowerCase().includes(value.toLowerCase())
    //     }))
    // }

    const setMovies = (value) => {
        setFilteredMovies(filterMovies(value))
        console.log(filteredMovies)
    }

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={onCheckboxShorts}
                    onSearch={setMovies}/>
                <MoviesCardList
                    movies={filteredMovies}
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
