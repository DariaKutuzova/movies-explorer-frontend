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

    const [currentUser, setIsCurrentUser] = useState({name: '', email: ''});

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

    const getUserInfo = () => {
        mainApi.getApiUserInfo()
            .then((userData) => {
                setIsCurrentUser(userData)
            })
    }

    useEffect(() => {
        AllMovies();
        getUserInfo();
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

    const sliceMovies = (movies, slice) => {
        return movies.slice(0, slice);
    }

    //Проверка токена
    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            mainApi.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        setIsAuthorizedEmail(res.email)
                    }
                })
                .catch((err) => {
                    console.log(`Не удалось получить токен: ${err}`)
                })
        }
    }

    //Регистрация
    function handleSignUp(email, password, name) {
        mainApi.register(email, password, name)
            .then(
                () => {
                    setIsRegistered(true);
                    navigate('/signin');
                })
            .catch((err) => {
                console.log(err);
                setIsRegistered(false);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
            })
    }

    //Функция входа
    function handleAuthorize(email, password) {
        mainApi.authorize(email, password)
            .then((data) => {
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
    }

    //Функция выхода из акка
    function handleLogout() {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        navigate('/signin')
    }

    //Изменить инфо пользователя
    function handleUpdateUser(data) {
        mainApi.patchUserInfo(data)
            .then(
                (data) => {
                    setIsCurrentUser(data);
                })
            .catch((err) => {
                console.log(err);
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

    // function addMovies() {
    //     setSlice(slice + 4)
    // }


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
                            // cards={cards}
                            filterMovies={filterMovies}
                            filterShorts={filterShorts}
                            sliceMovies={sliceMovies}
                            // onCheckboxShorts={filterShorts}
                            // addMovies={addMovies}
                            startState={startState}
                            onSaveMovie={handleMovieLike}
                            // onSearch={filterMovies}
                            // onSingOut={handleLogout}
                        />}/>
                    <Route path="/saved-movies" element={
                            <ProtectedRoute
                                element={SavedMovies}
                                loggedIn={loggedIn}
                            // onSingOut={handleLogout}
                        />}/>
                    <Route path="/profile" element={
                        <ProtectedRoute
                            element={Profile}
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
