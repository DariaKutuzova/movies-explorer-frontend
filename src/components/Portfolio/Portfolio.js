import '../App/App.css'
import './Portfolio.css'

function Portfolio() {

    return (
        <div className="portfolio app__container">
            <h3 className="portfolio__header">Портфолио</h3>
            <div className="portfolio__links">
                <a className="portfolio__link" href="https://dariakutuzova.github.io/how-to-learn/">Статичный сайт</a>
                <a className="portfolio__link" href="https://dariakutuzova.github.io/russian-travel/">Адаптивный сайт</a>
                <a className="portfolio__link" href="https://kutuzova.mesto.students.nomoredomains.work">Одностраничное приложение</a>
            </div>
        </div>
    );
}

export default Portfolio;
