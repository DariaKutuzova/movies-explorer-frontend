import {Link} from 'react-router-dom';
import {useState} from "react";
import './Login.css'
import '../SignPopup/SignPopup.css';
import SignPopup from "../SignPopup/SignPopup";


function Login({isOpen, onClose, onEntryUser}) {

    const linkToEntry = (
        <p className="sign__text">Ещё не зарегестрированы?
            <Link className="sign__link" to="/signup">Регистрация</Link>
        </p>
    )

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();
        onEntryUser(email, password);
    }

    return (
        <SignPopup
            name={'login'}
            title={'Рады видеть!'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Войти'}
            onSubmit={handleSubmit}
            linkToEntry={linkToEntry}
            // isDisabled={!email || !password}
        >
            <label htmlFor="email-input" className="sign__label">E-mail</label>
            <input type="email" placeholder="Email" className={`sign__input`}
                   id="email-input" name="email" minLength="2" maxLength="40" required
                value={email}
                   // value='pochta@yandex.ru'
                   onChange={handleEmailChange}/>
            <span id="email-input-error" className="sign__text-error">Что-то пошло не так...</span>
            <label htmlFor="email-input" className="sign__label">Пароль</label>
            <input type="password" placeholder="Пароль"
                   className={`sign__input sign__input-error`}
                   id="password-input" name="password" minLength="2" maxLength="200" required
                value={password}
                   // value='Виталий'
                   onChange={handlePasswordChange}/>
            <span id="password-input-error" className="sign__text-error sign__text-error_active login__text-error">Что-то пошло не так...</span>
        </SignPopup>
    );
}


export default Login;
