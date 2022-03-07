import '../App/App.css'
import './Portfolio.css'
import arrow from '../../images/arrow.svg'

function Portfolio() {

    return (
        <div className="portfolio app__container">
            <h3 className="portfolio__header">Портфолио</h3>
            <div className="portfolio__links">
                <a className="portfolio__link">Статичный сайт</a>
                <a className="portfolio__link">Адаптивный сайт</a>
                <a className="portfolio__link">Одностраничное приложение</a>
            </div>
        </div>
    );
}

export default Portfolio;
