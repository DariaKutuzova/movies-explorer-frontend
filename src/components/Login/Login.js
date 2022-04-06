import {Link} from 'react-router-dom';
import {useState} from "react";
import './Login.css'
import '../SignPopup/SignPopup.css';
import SignPopup from "../SignPopup/SignPopup";
import validator from "validator";


function Login({isOpen, onClose, onEntryUser}) {

    const linkToEntry = (
        <p className="sign__text">Ещё не зарегестрированы?
            <Link className="sign__link" to="/signup">Регистрация</Link>
        </p>
    )

    const [inputValues, setInputValues] = useState({email: '', password: ''});
    const [inputValid, setInputValid] = useState({email: false, password: false});
    const [inputError, setInputError] = useState({email: '', password: ''});
    const [inputDirty, setInputDirty] = useState({email: false, password: false});


    function handleSubmit(e) {
        e.preventDefault();
        onEntryUser(
            inputValues.email,
            inputValues.password,
        )
    }

    //Если убрал курсор из инпута
    function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setInputDirty({...inputDirty, email: true});
                break;
            case 'password':
                setInputDirty({...inputDirty, password: true});
                break;
            default:
                setInputDirty({email: false, password: false});
                break;
        }
    }

    //Проверка на валидность
    function checkInputValid(e) {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        setInputValid({
            email: validator.isEmail(e.target.value) && e.target.validity.valid,
            password: e.target.validity.valid
        });
        setInputError({
            ...inputError,
            [e.target.name]: e.target.validationMessage
        });
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
            isDisabled={!inputValid.email || !inputValid.password}
        >
            <label htmlFor="email-input" className="sign__label">E-mail</label>
            <input type="email" placeholder="Email"
                   className={`sign__input 
            ${!inputValid.email && inputDirty.email ? 'sign__input-error'
                       : ''}`}
                   id="email-input" name="email" minLength="2" maxLength="40" required
                   value={inputValues.email}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}/>
            <span id="email-input-error" className="sign__text-error sign__text-error_active login__text-error">
                {inputValid.email && !inputDirty.email ? '' : inputError.email}
            </span>
            <label htmlFor="email-input" className="sign__label">Пароль</label>
            <input type="password" placeholder="Пароль"
                   className={`sign__input 
            ${!inputValid.password && inputDirty.password ? 'sign__input-error'
                       : ''}`}
                   id="password-input" name="password" minLength="2" maxLength="200" required
                   value={inputValues.password}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}/>
            <span id="password-input-error" className="sign__text-error sign__text-error_active login__text-error">
                {inputValid.password && !inputDirty.password ? '' : inputError.password}
            </span>
        </SignPopup>
    );
}


export default Login;
