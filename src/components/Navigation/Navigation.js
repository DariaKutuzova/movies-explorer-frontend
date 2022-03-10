import '../Header/Header.css';
import './Navigation.css';
import {Link, useNavigate} from "react-router-dom";

function Navigation() {

    const navigate = useNavigate();

    function handleAccount() {
        navigate('/profile');
    }

    return (
        <nav className="navigation">
            <div className="navigation__links">
                <Link className="navigation__link" to='/'>Главная</Link>
                <Link className="navigation__link" to='/movies'>Фильмы</Link>
                <Link className="navigation__link" to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
            <div className="header__account navigation__account" onClick={handleAccount}>
                <a className="header__account-text">Аккаунт</a>
                <button className="header__account-button" type="button"/>
            </div>

        </nav>
    );
}

export default Navigation;
