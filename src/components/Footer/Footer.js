import '../App/App.css'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer app__item app__container">
            <p className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copy">&copy; 2022</p>
                <nav className="footer__links">
                    <a className="footer__link">Яндекс.Практикум</a>
                    <a className="footer__link">Github</a>
                    <a className="footer__link">Telegram</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
