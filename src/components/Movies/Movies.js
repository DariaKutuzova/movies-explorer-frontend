import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";

function Movies({addMovies, onSaveMovie, filterMovies, filterShorts, cards, onDeleteMovie}) {

    const [searchValue, setSearchValue] = useState("");
    const [isShortMovies, setIsShortMovies] = useState(false);

    const [numberMoviesInDisplay, setNumberMoviesInDisplay] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1280) {
            return 16
        } else if (windowWidth >= 768) {
            return 12
        } else if (windowWidth >= 480) {
            return 8
        } else return 5
    })
    const [currentMoviesNumber, setCurrentMoviesNumber] = useState(numberMoviesInDisplay);

    const [numberMoviesAdd, setNumberMoviesAdd] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1279) {
            return 4
        } else if (windowWidth >= 768) {
            return 3
        } else if (windowWidth >= 480) {
            return 2
        } else return 2
    })

    function onChangeScreenWidth() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1279) {
            setCurrentMoviesNumber(16);
            setNumberMoviesAdd(4);
        } else if (windowWidth >= 768) {
            setCurrentMoviesNumber(12);
            setNumberMoviesAdd(3);
        } else if (windowWidth >= 480) {
            setCurrentMoviesNumber(8);
            setNumberMoviesAdd(2);
        } else {
            setCurrentMoviesNumber(5);
            setNumberMoviesAdd(2);
        }
    }

    function setMovies(value) {
        setSearchValue(value);
    }
    function filterShortMovies(value) {
        setIsShortMovies(value);
    }

    function addMoviesVisible() {
        setCurrentMoviesNumber(prevState => prevState + numberMoviesAdd);
    }

    useEffect(() => {
        window.addEventListener('resize', onChangeScreenWidth);
        return () => {
            window.removeEventListener('resize', onChangeScreenWidth)
        }
    }, []);


    const filteredMovies = searchValue ? (filterShorts(filterMovies(cards, searchValue), isShortMovies)) : [];
    const moviesVisible = filteredMovies.slice(0, currentMoviesNumber);

    return (
        <div>
            <div className="movies app__item">
                <SearchForm
                    onCheckboxShorts={filterShortMovies}
                    onSearch={setMovies}/>
                <MoviesCardList
                    movies={moviesVisible}
                    startState={!!searchValue === false}
                    onDeleteMovie={onDeleteMovie}
                    onSaveMovie={onSaveMovie}/>
                <MoreMovies
                    movies={filteredMovies}
                    addMovies={addMoviesVisible}
                    isFull={currentMoviesNumber >= filteredMovies.length}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
