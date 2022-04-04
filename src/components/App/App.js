import {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
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
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import withCache from "../../utils/OfflineRepository";

function App() {

    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentUser, setIsCurrentUser] = useState({name: '', email: ''});

    const [moviesStore, setMoviesStore] = useState({
        moviesItems: [],
        savedMovies: [],
    });

    // const [isRendering, setIsRendering] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setIsLoggedIn] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            handleTokenCheck();
        }, 100);
    }, [])

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            withCache("movies", api.getAllMovies.bind(api)),
            withCache("savedMovies", mainApi.getAllMovies.bind(mainApi)),
            mainApi.getApiUserInfo()])
            .then(([movies, savedMovies, userData]) => {
                setIsCurrentUser(userData);
                setMoviesStore({
                    savedMovies: savedMovies.map(prepareSavedMovie),
                    moviesItems: movies.map((movie) => prepareMovie(movie, savedMovies))
                })
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => setIsLoading(false));

    }, [loggedIn])


    const prepareSavedMovie = (savedMovie) =>  Object.assign(savedMovie, { id: savedMovie._id});

    const prepareMovie = (movie, savedMovies) => {
        let result = savedMovies.filter(m => m.movieId === movie.id)
        let savedMovieId = result.length > 0 ? result[0].id : null;
        let saved = result.length > 0
        return Object.assign(movie, {
            savedId: savedMovieId,
            movieId: movie.id,
            saved: saved,
            image: mainApi.prepareImage(movie.image),
        })
    }

    const filterMovies = (movies, value) => {
        if (value) {
            return movies.filter(movie => {
                return movie.nameRU.toLowerCase().includes(value.toLowerCase())
            })
        }
        return movies
    }

    const filterShorts = (movies, value) => {
        if (value) {
            return movies.filter(movie => {
                return movie.duration <= 40
            })
        }
        return movies
    }

    const sliceMovies = (movies, slice) => {
        return movies.slice(0, slice);
    }

    //Проверка токена
    function handleTokenCheck() {
        setIsLoading(true);
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            mainApi.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                    }
                })
                .catch((err) => {
                    setIsLoggedIn(false)
                    console.log(`Не удалось получить токен: ${err}`)
                })
                .finally(() => {
                    // setIsRendering(false);
                    setIsLoading(false);
                })
        }
    }

    //Регистрация
    function handleSignUp(email, password, name) {
        setIsLoading(true);
        mainApi.register(email, password, name)
            .then(
                () => {
                    setIsSuccess(true);
                    navigate('/signin');
                })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsLoading(false);
            })
    }

    //Функция входа
    function handleAuthorize(email, password) {
        setIsLoading(true);
        mainApi.authorize(email, password)
            .then((data) => {
                setIsSuccess(true);
                localStorage.setItem('jwt', data.token);
                handleTokenCheck();
                setIsLoggedIn(true);
                navigate('/movies');
                console.log('ok')
            })
            .catch((err) => {
                setIsSuccess(false);
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
        navigate('/signin');
    }

    //Изменить инфо пользователя
    function handleUpdateUser(data) {
        setIsLoading(true);
        mainApi.patchUserInfo(data)
            .then(
                (data) => {
                    setIsSuccess(true);
                    setIsCurrentUser(data);
                })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsLoading(false);
            })
    }

    //Функция лайка карточки
    function handleMovieLike(movie) {
        setIsLoading(true);

        mainApi.saveMovie(movie)
            .then((data) => {
                setIsSuccess(true);
                console.log(data)
                let savedMovies = [...moviesStore.savedMovies, prepareSavedMovie(data.data)];
                setMoviesStore({
                    savedMovies: savedMovies,
                    moviesItems:  moviesStore.moviesItems.map((movie) => prepareMovie(movie, savedMovies)),
                })
                console.log(moviesStore.savedMovies)
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function deleteMovie(id) {
        setIsLoading(true);
        console.log(id)
        mainApi
            .deleteMovie(id)
            .then(() => {
                setIsSuccess(true);
                const newMovies = moviesStore.savedMovies.filter(
                    (savedMovie) => savedMovie.id !== id
                );
                setMoviesStore({
                    savedMovies: newMovies,
                    moviesItems: moviesStore.moviesItems.map((movie) => prepareMovie(movie, newMovies)),
                })
                console.log(moviesStore.savedMovies)
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    function closeAllPopups() {
        setIsInfoTooltipPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Preloader
                    isLoading={isLoading}
                />
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
                            // isRendering={isRendering}
                            filterMovies={filterMovies}
                            filterShorts={filterShorts}
                            sliceMovies={sliceMovies}
                            onSaveMovie={handleMovieLike}
                            onDeleteMovie={deleteMovie}
                            cards={moviesStore.moviesItems}
                        />}/>
                    <Route path="/saved-movies" element={
                        <ProtectedRoute
                            element={SavedMovies}
                            // isRendering={isRendering}
                            onDeleteMovie={deleteMovie}
                            loggedIn={loggedIn}
                            filterMovies={filterMovies}
                            filterShorts={filterShorts}
                            cards={moviesStore.savedMovies}
                        />}/>
                    <Route path="/profile" element={
                        <ProtectedRoute
                            element={Profile}
                            // isRendering={isRendering}
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

                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={isInfoTooltipPopupOpen}
                    isSuccess={isSuccess}/>
            </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
