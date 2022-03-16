import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {movies} from "../../utils/constants";

function Movies() {

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm/>
                <MoviesCardList
                movies={movies}/>
                <MoreMovies
                movies={movies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
