import '../App/App.css';
import './Profile.css';
import {useLocation, Link, useNavigate} from "react-router-dom";
import Header from "../Header/Header";

function Profile() {

    const navigate = useNavigate();

    function handleSignOut() {
        // setIsActive(false);
        // setTimeout(onSingOut, 700);
        navigate('/signin');
    }

    return (
        <div>
            <Header/>
            <div className="profile app__container">
                <form className="profile__form">
                    <h1 className="profile__header">Привет, Виталий</h1>
                    <div className="profile__string">
                        <label className="profile__label">
                            Имя
                        </label>
                        <input className="profile__input" value="Виталий"/>
                    </div>
                    <div className="profile__string">
                        <label className="profile__label">
                            E-mail
                        </label>
                        <input className="profile__input" value="pochta@yandex.ru"/>
                    </div>
                    <button className="profile__change-button" type='submit'>Редактировать</button>
                </form>
                <Link className="profile__signout" to="/signin" onClick={handleSignOut}>Выйти из аккаунта</Link>
            </div>
        </div>
    );
}

export default Profile;
