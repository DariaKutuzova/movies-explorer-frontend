import '../Header/Header.css';
import './Navigation.css';
import {useLocation, Link, useNavigate} from "react-router-dom";

function Navigation({onSingOut}) {

    const navigate = useNavigate();
    const address = useLocation();

    function handleAccount() {
        navigate('/profile');
    }

    return (
        <nav className="navigation">
            <div className="navigation__links">
                <Link className={`navigation__link ${address.pathname === '/' ? 'navigation__link_active' :''}`} to='/'>Главная</Link>
                <Link className={`navigation__link ${address.pathname === '/movies' ? 'navigation__link_active' :''}`} to='/movies'>Фильмы</Link>
                <Link className={`navigation__link ${address.pathname === '/saved-movies' ? 'navigation__link_active' :''}`} to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
            <div className="header__account navigation__account" onClick={handleAccount}>
                <a className="header__account-text">Аккаунт</a>
                <button className="header__account-button" type="button"/>
            </div>

        </nav>
    );
}

export default Navigation;
