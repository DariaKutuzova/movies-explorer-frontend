import {Link} from 'react-router-dom';
import {useState} from "react";
import './Register.css'
import '../SignPopup/SignPopup.css';
import SignPopup from "../SignPopup/SignPopup";


function Register({isOpen, onClose, onAddUser}) {

    const linkToEntry = (
        <p className="sign__text">Уже зарегистрированы?
            <Link className="sign__link" to="/signin">Войти</Link>
        </p>
    )

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddUser(email, password, name);
    }

    return (
        <SignPopup
            name={'register'}
            title={'Добро пожаловать!'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Зарегистрироваться'}
            onSubmit={handleSubmit}
            linkToEntry={linkToEntry}
            // isDisabled={!email || !password}
        >
            <label htmlFor="name-input" className="sign__label">Имя</label>
            <input type="name" placeholder="Имя" className={`sign__input`}
                   id="name-input" name="name" minLength="2" maxLength="40" required
                value={name}
                   // value='Виталий'
                   onChange={handleNameChange}/>
            <span id="email-input-error" className="sign__text-error">Что-то пошло не так...</span>
            <label htmlFor="email-input" className="sign__label">E-mail</label>
            <input type="email" placeholder="Email" className={`sign__input`}
                   id="email-input" name="email" minLength="2" maxLength="40" required
                value={email}
                //    value='pochta@yandex.ru'
                   onChange={handleEmailChange}/>
            <span id="email-input-error" className="sign__text-error">Что-то пошло не так...</span>
            <label htmlFor="email-input" className="sign__label">Пароль</label>
            <input type="password" placeholder="Пароль"
                   className={`sign__input sign__input-error`}
                   id="password-input" name="password" minLength="2" maxLength="200" required
                value={password}
                //    value='Виталий'
                   onChange={handlePasswordChange}/>
            <span id="password-input-error" className="sign__text-error sign__text-error_active register__text-error">Что-то пошло не так...</span>
        </SignPopup>
    );
}

export default Register;
