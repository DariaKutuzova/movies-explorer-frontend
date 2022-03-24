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
    const [inputValues, setInputValues] = useState({name: '', email: '', password: ''});
    const [inputValid, setInputValid] = useState({name: false, email: false, password: false});
    const [inputError, setInputError] = useState({name: '', email: '', password: ''});
    const [inputDirty, setInputDirty] = useState({name: false, email: false, password: false});


    function handleSubmit(e) {
        e.preventDefault();
        onAddUser(
            inputValues.email,
            inputValues.password,
            inputValues.name,
        )
    }

    //Если убрал курсор из инпута
    function blurHandler(e) {
        switch (e.target.name) {
            case 'name':
                setInputDirty({...inputDirty, name: true});
                break;
            case 'email':
                setInputDirty({...inputDirty, email: true});
                break;
            case 'password':
                setInputDirty({...inputDirty, password: true});
                break;
            default:
                setInputDirty({name: false, email: false, password: false});
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
            ...inputValid,
            [e.target.name]: e.target.validity.valid
        });
        setInputError({
            ...inputError,
            [e.target.name]: e.target.validationMessage
        });
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
            <input type="text" placeholder="Имя"
                   className={`sign__input 
            ${!inputValid.name && inputDirty.name ? 'sign__input-error'
                       : ''}`}
                   id="name-input" name="name" minLength="2" maxLength="40" required
                   value={inputValues.name}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}/>
            <span id="email-input-error" className="sign__text-error sign__text-error_active login__text-error">
                {inputValid.name && !inputDirty.name ? '' : inputError.name}
            </span>
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

export default Register;
