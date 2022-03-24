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
import ProtectedRoute from "../ProtectedRoute";
import {Routes, Route, useNavigate} from "react-router-dom";
import {movies} from "../../utils/constants";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import MainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

let modificatedMovies = [];

function App() {

    const [checkedShorts, setCheckedShorts] = useState(false);
    const [slice, setSlice] = useState(4);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);
    const [authorizedEmail, setIsAuthorizedEmail] = useState('');

    const [currentUser, setIsCurrentUser] = useState({name: '', email: ''});

    // const [savedMovies, setSavedMovies] = React.useState([]);

    const [cards, setIsCards] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    const localMovies = JSON.parse(localStorage.getItem("localMovies"));
    const localFoundMovies = JSON.parse(localStorage.getItem("localFoundMovies"));
    const localSavedMovies = JSON.parse(localStorage.getItem("localSavedMovies"));
    const localSavedNotFoundMovies = JSON.parse(
        localStorage.getItem("localSavedNotFoundMovies")
    );

    const [isRendering, setIsRendering] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

    const [loggedIn, setIsLoggedIn] = useState(false);

    const [moviesItems, setMoviesItems] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [foundMovies, setFoundMovies] = React.useState(
        localFoundMovies !== null ? localFoundMovies : []
    );
    const navigate = useNavigate()

    const AllMovies = () => {
        api.getAllMovies()
            .then((movies) => {
                setIsLoading(true);
                setIsCards(movies);
                localStorage.setItem('movies', JSON.stringify(movies));
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const getUserInfo = () => {
        mainApi.getApiUserInfo()
            .then((userData) => {
                setIsLoading(true);
                localStorage.setItem("localLoggedIn", "true");
                setIsCurrentUser(userData);
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const getSavedMovies = () => {
        mainApi.getAllMovies()
            .then((movies) => {
                setIsLoading(true);
                setSavedMovies(movies);
                localStorage.setItem('savedMovies', JSON.stringify(movies));
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        handleTokenCheck()
    }, [])

    useEffect(() => {

        // AllMovies();
        getUserInfo();
        // getSavedMovies();
    }, [])

    useEffect(() => {
        if (loggedIn === true) {
            // navigate('/movies');
            AllMovies();
            getUserInfo();
            getSavedMovies();
        }
    }, [loggedIn])

    const filterMoviesAll = (value) => {
        return cards.filter(movie => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase())
        })
    }

    const filterMoviesSaved = (value) => {
        return savedMovies.filter(movie => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase())
        })
    }

    const filterShorts = (movies) => {
        return movies.filter(movie => {
            return movie.duration <= 40
        })
    }

    const sliceMovies = (movies, slice) => {
        return movies.slice(0, slice);
    }

    //Проверка токена
    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt");
        const movies = localStorage.getItem('movies');
        const savedMovies = localStorage.getItem('savedMovies');
        if (jwt) {
            mainApi.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoading(true);
                        setIsLoggedIn(true)
                        setIsAuthorizedEmail(res.email)
                    }
                })
                .catch((err) => {
                    console.log(`Не удалось получить токен: ${err}`)
                })
                .finally(() => {
                    setIsRendering(false);
                    setIsLoading(false);
                })
        }
    }

    //Регистрация
    function handleSignUp(email, password, name) {
        mainApi.register(email, password, name)
            .then(
                () => {
                    setIsLoading(true);
                    setIsRegistered(true);
                    navigate('/signin');
                })
            .catch((err) => {
                console.log(err);
                setIsRegistered(false);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsLoading(false);
            })
    }

    //Функция входа
    function handleAuthorize(email, password) {
        mainApi.authorize(email, password)
            .then((data) => {
                setIsLoading(true);
                localStorage.setItem('jwt', data.token);
                handleTokenCheck();
                setIsLoggedIn(true);
                setIsAuthorizedEmail(email)
                navigate('/movies');
                console.log('ok')
            })
            .catch((err) => {
                if (err === Number(400)) {
                    alert('Не заполнено одно из полей')
                } else if (err === Number(401)) {
                    alert('Неправильно введен логин или пароль')
                }
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsLoading(false);
            })
    }

    //Функция выхода из акка
    function handleLogout() {
        localStorage.clear();
        setIsLoggedIn(false)
        navigate('/signin')
    }

    //Изменить инфо пользователя
    function handleUpdateUser(data) {
        mainApi.patchUserInfo(data)
            .then(
                (data) => {
                    setIsLoading(true);
                    setIsCurrentUser(data);
                })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsLoading(false);
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


    // function addMovies() {
    //     setSlice(slice + 4)
    // }


    //Функция лайка карточки
    function handleMovieLike(movie) {
        mainApi.saveMovie(movie)
            .then((data) => {
                setIsLoading(true);
                setSavedMovies([...savedMovies, data])
                localStorage.setItem('savedMovies', JSON.stringify(data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Header
                    loggedIn={loggedIn}
                />
                <Routes>
                    <Route path="/signup" element={
                        <Register onAddUser={handleSignUp}
                        />}/>
                    <Route path="/signin" element={
                        <Login onEntryUser={handleAuthorize}
                        />}/>
                    <Route path="/movies" element={
                        <ProtectedRoute
                            element={Movies}
                            loggedIn={loggedIn}
                            isRendering={isRendering}
                            filterMovies={filterMoviesAll}
                            filterShorts={filterShorts}
                            sliceMovies={sliceMovies}
                            onSaveMovie={handleMovieLike}
                        />}/>
                    <Route path="/saved-movies" element={
                        <ProtectedRoute
                            element={SavedMovies}
                            isRendering={isRendering}
                            loggedIn={loggedIn}
                            filterMovies={filterMoviesSaved}
                            filterShorts={filterShorts}
                        />}/>
                    <Route path="/profile" element={
                        <ProtectedRoute
                            element={Profile}
                            isRendering={isRendering}
                            loggedIn={loggedIn}
                            onSingOut={handleLogout}
                            onUpdateUser={handleUpdateUser}
                        />}/>
                    <Route exact path="/" element={
                        <Main
                        />}/>
                    <Route path="*" element={
                        <NotFound/>}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
