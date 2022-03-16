import logo from "../../images/logo.svg";
import './SignPopup.css';

function SignPopup({isOpen, onClose, name, title, children, onSubmit, isDisabled, linkToEntry, buttonText}) {


    function handlePopupClose(e) {
        if (e.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div className={`sign ${isOpen ? 'popup_opened' : ''}`}
             onClick={handlePopupClose}>
            <div className={`sign__container`}>
                <img src={logo} alt="Лого шапки" className="header__logo"/>
                <h2 className="sign__header">{title}</h2>
                <form action="#" className={`sign__form`} name={`${name}`}
                      onSubmit={onSubmit}>
                    {children}
                    <button className={`sign__button`}
                            disabled={isDisabled} type="submit">{buttonText}
                    </button>
                    {linkToEntry}
                </form>

            </div>
        </div>

    );
}

export default SignPopup;
