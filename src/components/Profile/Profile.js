import '../App/App.css';
import './Profile.css';
import {useLocation, Link, useNavigate} from "react-router-dom";

const validator = require('validator');
import {useContext, useState, useEffect} from "react";


import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({onSingOut, onUpdateUser}) {

    const [inputValues, setInputValues] = useState({name: '', email: ''});
    const [inputValid, setInputValid] = useState({name: false, email: false});
    const [inputError, setInputError] = useState({name: '', email: ''});
    const [inputDirty, setInputDirty] = useState({name: false, email: false});
    const [isChanged, setIsChanged] = useState({name: false, email: false});

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    const isNotChange = currentUser.email === inputValues.email || currentUser.name === inputValues.name;

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setInputValues({name: currentUser.name, email: currentUser.email});
            setInputValid({name: false, email: false});
            setInputError({name: '', email: ''});
            setInputDirty({name: false, email: false});
        }
    }, [currentUser]);

    function handleSignOut() {
        onSingOut();
        navigate('/');
    }

    function handleValuesChange(e) {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        setInputValid({
            name: e.target.validity.valid,
            email: validator.isEmail(e.target.value) && e.target.validity.valid,
        });
        // setIsChanged({
        //     name: e.target.value !== currentUser.name,
        //     email: e.target.value !== currentUser.email
        // })
        // console.log(e.target.value)
        // console.log(currentUser.email)
        // console.log(isChanged)

    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: inputValues.name,
            email: inputValues.email,
        });
    }

    return (
        <div>
            <div className="profile">
                <div className="profile__container app__container">
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <h1 className="profile__header">{`Привет, ${currentUser.name}`}</h1>
                        <div className="profile__string">
                            <label className="profile__label">
                                Имя
                            </label>
                            <input className="profile__input"
                                   value={inputValues.name}
                                   placeholder="Ввeдите имя, чтобы изменить"
                                   onChange={handleValuesChange}
                                   name='name'
                                   required/>
                        </div>
                        <div className="profile__string">
                            <label className="profile__label">
                                E-mail
                            </label>
                            <input className="profile__input"
                                   value={inputValues.email}
                                   placeholder="Ввeдите email, чтобы изменить"
                                   onChange={handleValuesChange}
                                   name='email'
                                   required/>
                        </div>
                        <button className="profile__change-button" type='submit'
                                disabled={(!inputValid.email || !inputValid.name) && isNotChange}
                        >Редактировать
                        </button>
                    </form>
                    <Link className="profile__signout" to="/signin" onClick={handleSignOut}>Выйти из аккаунта</Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
