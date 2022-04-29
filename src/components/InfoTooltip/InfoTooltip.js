import error from "../../images/error.svg";
import success from "../../images/success.svg";
import './InfoTooltip.css';

function InfoTooltip({isOpen, onClose, isSuccess}) {

    function handlePopupClose(e) {
        if (e.target.classList.contains('info-tooltip_opened')) {
            onClose();
        }
    }

    return (
        <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`}
             onClick={handlePopupClose}>
            <div className="info-tooltip__container">
                <img className="info-tooltip__icon" src={isSuccess ? success : error}
                     alt={isSuccess ? 'иконка успешной операции' : 'иконка ошибки'}/>
                <h3 className="info-tooltip__form-header">{isSuccess ?
                    'Получилось!' :
                    'Что-то пошло не так... Попробуйте ещё раз.'}
                </h3>
                <button onClick={onClose} className={`info-tooltip__close`}
                        type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default InfoTooltip;
