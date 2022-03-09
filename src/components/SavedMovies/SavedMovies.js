import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {savedMovies} from "../../utils/constants";

function SavedMovies() {

    return (
        <div>
            <Header/>
            <div className="movies app__item">
                <SearchForm/>
                <MoviesCardList
                    movies={savedMovies}/>
                <MoreMovies
                    movies={savedMovies}/>
            </div>
            <Footer/>
        </div>
    );
}

export default SavedMovies;
