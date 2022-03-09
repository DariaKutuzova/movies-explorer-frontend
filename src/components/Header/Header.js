import logo from "../../images/logo.svg";
import './Header.css'
import {useLocation, Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function Header({loggedIn, onSingOut, autoEmail}) {

    const [isActive, setIsActive] = useState(false);

    const address = useLocation();
    const navigate = useNavigate();

    function handleSignUp() {
        navigate('/signup');
    }

    function handleSignIn() {
        navigate('/signin');
    }

    function handleLanding() {
        navigate('/');
    }

    function handleMovies() {
        navigate('/movies');
    }

    function handleSavedMovies() {
        navigate('/saved-movies');
    }

    function handleAccount() {
        navigate('/profile');
    }

    function handleNavi() {
        setIsActive(!isActive);
    }

    return (
        <div style={{margin: 0}}>
            {address.pathname === '/' &&
            (<header className="header app__item app__container header_landing">
                <div className="header__basic">
                    <img src={logo} alt="Лого шапки" className="header__logo" onClick={handleLanding}/>
                    <nav className="header__entry">
                        <a className="header__text" onClick={handleSignUp}>Регистрация</a>
                        <button className="header__button" type="button" onClick={handleSignIn}>Войти</button>
                    </nav>
                </div>
            </header>)}
            {(address.pathname === '/movies' ||
                address.pathname === '/saved-movies' ||
                address.pathname === '/profile') &&
            (<header className="header app__item app__container">
                <div className="header__basic">
                    <nav className="header__navigation">
                        <img src={logo} alt="Лого шапки" className="header__logo" onClick={handleLanding}/>
                        <Link className="header__link" to="/movies" onClick={handleMovies}>Фильмы</Link>
                        <Link className="header__link" to="/saved-movies" onClick={handleSavedMovies}>Сохраненные
                            фильмы</Link>
                    </nav>
                    <div className="header__account" onClick={handleAccount}>
                        <a className="header__account-text">Аккаунт</a>
                        <button className="header__account-button" type="button"/>
                    </div>
                </div>
            </header>)}
        </div>
    );
}

export default Header;
