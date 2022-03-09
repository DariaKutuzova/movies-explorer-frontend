import {Link} from "react-router-dom";
import './NotFound.css'
import '../App/App.css';

function NotFound() {

    return (
        <main className="not-found app__item">
            <h1 className="not-found__header">404</h1>
            <p className="not-found__description">Страница не найдена</p>
            <Link className="not-found__link" to="/">Назад</Link>

        </main>
    );
}

export default NotFound;
