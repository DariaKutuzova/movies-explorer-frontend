import {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import api from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Register from '../Register/Register';
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {Routes, Route, useNavigate} from "react-router-dom";
import {movies} from "../../utils/constants";

let modificatedMovies = [];

function App() {

    const [checkedShorts, setCheckedShorts] = useState(false);
    const [slice, setSlice] = useState(4);
    const [startState, setStartState] = useState(true);

    const [savedMovies, setSavedMovies] = useState([]);
    // const [selectedCard, setIsSelectedCard] = useState(null);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);
    const [authorizedEmail, setIsAuthorizedEmail] = useState('');

    const [currentUser, setIsCurrentUser] = useState({avatar: '', name: '', about: ''});

    const [cards, setIsCards] = useState([]);

    const [loggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const AllMovies = () => {
        api.getAllMovies()
            .then((movies) => {
                setIsCards(movies);
            })
            .catch((err) => {
                console.log(`${err}`);
            })
    }

    useEffect(() => {

        AllMovies()
    }, [])

    const filterMovies = (value) => {
        return cards.filter(movie => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase())
        })
    }

    const filterShorts = (movies) => {
        return movies.filter(movie => {
            return movie.duration <= 40
        })
    }

    // useEffect(() => {
    //   Promise.all([api.getAllMovies()])
    //       .then(([allMovies]) => {
    //         setIsCards(allMovies);
    //       })
    //       .catch((err) => {
    //         console.log(`${err}`);
    //       })
    // }, [checkedShorts]);

    // useEffect(() => {
    //   handleTokenCheck()
    // }, [])

    // useEffect(() => {
    //   if (loggedIn === true) {
    //     navigate('/movies');
    //     Promise.all([api.getAllMovies(), mainApi.getApiUserInfo()])
    //         .then(([allMovies, userData]) => {
    //           setIsCurrentUser(userData);
    //           setIsCards(allMovies.reverse());
    //         })
    //         .catch((err) => console.log(`${err}`));
    //   }
    // }, [loggedIn, navigate])

    // function filterShorts() {
    //   setCheckedShorts(true)
    // }
    //
    // function applyFilterShorts(movies) {
    //   let filteredArr = [];
    //   if (checkedShorts === false) {
    //     return movies;
    //   }
    //   if (checkedShorts === true) {
    //     filteredArr = movies.filter(item => (item.duration <= 40))
    //   }
    //   movies = filteredArr
    //   return movies;
    // }
    //
    // function applySlice(movies) {
    //   return movies.slice(0, slice);
    // }

    function addMovies() {
        setSlice(slice + 4)
    }

    //
    // function applyAll() {
    //   let moviesCopy = modificatedMovies.slice()
    //   moviesCopy = applyFilterShorts(moviesCopy)
    //   moviesCopy = applySlice(moviesCopy)
    //   return moviesCopy;
    // }
    //
    // let movies = applyAll()

    function searchMovies() {

    }

    //Функция лайка карточки
    function handleMovieLike(movie) {
        mainApi.saveMovie(movie)
            .then((data) => {
                setSavedMovies([...savedMovies, data])
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        // <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
            <Routes>
                <Route path="/signup" element={
                    <Register
                    />}/>
                <Route path="/signin" element={
                    <Login
                    />}/>
                <Route path="/movies" element={
                    <Movies
                        // cards={cards}
                        filterMovies={filterMovies}
                        filterShorts={filterShorts}
                        // onCheckboxShorts={filterShorts}
                        addMovies={addMovies}
                        startState={startState}
                        onSaveMovie={handleMovieLike}
                        // onSearch={filterMovies}
                    />}/>
                <Route path="/saved-movies" element={
                    <SavedMovies
                    />}/>
                <Route path="/profile" element={
                    <Profile
                    />}/>
                <Route exact path="/" element={
                    <Main
                    />}/>
                <Route path="*" element={
                    <NotFound/>}/>
            </Routes>
        </div>
        // </CurrentUserContext.Provider>
    )
        ;
}

export default App;
