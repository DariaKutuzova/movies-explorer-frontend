import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";

function Movies({addMovies, onSaveMovie, filterMovies, filterShorts, cards, onDeleteMovie}) {

    const [searchValue, setSearchValue] = useState("");
    const [isShortMovies, setIsShortMovies] = useState(false);

    let finalMovies = searchValue ? (filterShorts(filterMovies(cards, searchValue), isShortMovies)) : [];

    const setMovies = (value) => {
        setSearchValue(value)
    }
    const filterShortMovies = (value) => {
        setIsShortMovies(value)
    }

    const [numberMoviesInDisplay, setNumberMoviesInDisplay] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1280) {
            return 12
        } else if (windowWidth <= 768) {
            return 8
        } else if (windowWidth <= 480) {
            return 5
        } else return 16
    })

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
            setNumberMoviesInDisplay(16);
            setNumberMoviesAdd(4);
        } else if (windowWidth >= 768) {
            setNumberMoviesInDisplay(12);
            setNumberMoviesAdd(3);
        } else if (windowWidth >= 480) {
            setNumberMoviesInDisplay(8);
            setNumberMoviesAdd(2);
        } else {
            setNumberMoviesInDisplay(5);
            setNumberMoviesAdd(2);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onChangeScreenWidth);
    }, []);

    const moviesVisible = finalMovies.slice(0, numberMoviesInDisplay);
    console.log(moviesVisible)
    console.log(finalMovies)

    const isFull = () => {
        if (finalMovies.length === moviesVisible.length) {
            return true
        } else return false
    }

    console.log(isFull())

    function addMoviesVisible() {
        setNumberMoviesInDisplay(prevState => prevState + numberMoviesAdd);
    }

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
                    movies={finalMovies}
                    addMovies={addMoviesVisible}
                    isFull={isFull()}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Movies;
