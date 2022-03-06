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

    function handleSignOut() {
        setIsActive(false);
        setTimeout(onSingOut, 700);
    }

    function handleNavi() {
        setIsActive(!isActive);
    }

    return (
        <header className="header app__item app__container">
            {/*{loggedIn && (*/}
            {/*    <div className={`header__menu ${!isActive ? 'header__menu_active' : ''}`}>*/}
            {/*        <nav className={`header__entry header__show-menu`}>*/}
            {/*            <p className="header__text">{autoEmail}</p>*/}
            {/*            <button className="header__button" type="button" onClick={handleSignOut}>Выйти</button>*/}
            {/*        </nav>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="header__basic">
                <img src={logo} alt="Лого шапки" className="header__logo"/>
                <nav className="header__entry">
                    <a className="header__text" onClick={handleSignUp}>Регистрация</a>
                    <button className="header__button" type="button" onClick={handleSignIn}>Войти</button>
                </nav>
                {/*{loggedIn && (*/}
                {/*    <>*/}
                {/*        <nav className="header__entry">*/}
                {/*            <p className="header__text">{autoEmail}</p>*/}
                {/*            <button className="header__button" type="button" onClick={handleSignOut}>Выйти</button>*/}
                {/*        </nav>*/}
                {/*        <button className="header__navi" type="button" onClick={handleNavi}>*/}
                {/*            <span*/}
                {/*                className={`header__navi-line */}
                {/*                ${isActive ? 'header__navi-line_active' : ''}`}>*/}
                {/*            </span>*/}
                {/*        </button>*/}
                {/*    </>*/}
                {/*)}*/}
                {/*{!loggedIn && (*/}
                {/*    <p>*/}
                {/*        {address.pathname === '/signin' &&*/}
                {/*        (<Link className="header__link" to="/signup">Регистрация</Link>)}*/}
                {/*        {address.pathname === '/signup' &&*/}
                {/*        (<Link className="header__link" to="/signin">Войти</Link>)}*/}
                {/*    </p>*/}
                {/*)}*/}
            </div>
        </header>
    );
}

export default Header;
