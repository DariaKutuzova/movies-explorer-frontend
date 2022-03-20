import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useState} from "react";
// import {movies} from "../../utils/constants";

function Movies({movies, onCheckboxShorts, addMovies, startState, onSaveMovie, onSearch}) {

    const [filteredMovies, setFilteredMovies] = useState([]);

    const filterMovies = () => {
        setFilteredMovies(movies())
        console.log(filteredMovies)
    }

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={onCheckboxShorts}
                    onSearch={filterMovies}/>
                <MoviesCardList
                movies={filteredMovies}
                startState={startState}
                onSaveMovie={onSaveMovie}/>
                <MoreMovies
                movies={movies}
                addMovies={addMovies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
