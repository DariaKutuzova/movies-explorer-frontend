import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import {movies} from "../../utils/constants";

function Movies({movies, onCheckboxShorts, addMovies}) {

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={onCheckboxShorts}/>
                <MoviesCardList
                movies={movies}/>
                <MoreMovies
                movies={movies}
                addMovies={addMovies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
