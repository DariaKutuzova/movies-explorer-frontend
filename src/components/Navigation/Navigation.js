import '../Header/Header.css';
import './Navigation.css';
import {useLocation, Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function Navigation({onClose}) {

    const navigate = useNavigate();
    const address = useLocation();

    function handleAccount() {
        navigate('/profile');
    }

    function setStateIsOpen () {
        // setIsOpen(false)
    }

    function handlePopupClose(e) {
        if (e.target.classList.contains('navigation__link')
        || e.target.classList.contains('navigation__acc')) {
            onClose();
        }
    }

    return (
        <nav className="navigation" onClick={handlePopupClose}>
            <div className="navigation__links">
                <Link className={`navigation__link ${address.pathname === '/' ? 'navigation__link_active' :''}`} to='/'>Главная</Link>
                <Link className={`navigation__link ${address.pathname === '/movies' ? 'navigation__link_active' :''}`} to='/movies'>Фильмы</Link>
                <Link className={`navigation__link ${address.pathname === '/saved-movies' ? 'navigation__link_active' :''}`} to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
            <div className="header__account navigation__account navigation__acc" onClick={handleAccount}>
                <a className="header__account-text navigation__acc">Аккаунт</a>
                <button className="header__account-button navigation__acc" type="button"/>
            </div>

        </nav>
    );
}

export default Navigation;
