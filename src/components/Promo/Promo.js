import './Promo.css'
import circles from '../../images/circles_landing.svg'

function Promo() {

    return (
        <div className="promo app__item import">
            <h1 className='promo__header'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__img' src={circles} alt="Круги"/>
        </div>
    );
}

export default Promo;
