import './MoviesCard.css';
import '../App/App.css';
import {useLocation} from "react-router-dom";
import film from '../../images/film.jpg'
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function MoviesCard({movie}) {

    const address = useLocation();
    const baseUrl = 'https://api.nomoreparties.co'

    return (
            <article className="movies-card">
                <img src={`${baseUrl}${movie.image.url}`} alt={`${movie.nameRU}`} className="movies-card__image"/>
                <div className="movies-card__caption">
                    <div className="movies-card__text">
                    <h2 className="movies-card__description">{movie.nameRU}</h2>
                    <span className="movies-card__duration">{movie.duration}</span>
                    </div>
                    <div>
                    {address.pathname === '/movies' &&
                    (<div className="movies-card__like">
                        <input id={movie.id} type="checkbox" name="check" className="movies-card__like-button"
                               aria-label="Нравится"/>
                        <label htmlFor={movie.id} className="movies-card__like-newbutton">

                        </label>
                    </div>)}
                    {address.pathname === '/saved-movies' &&
                    (<div className="movies-card__delete">
                            <button className="movies-card__delete-button"/>
                        </div>)
                    }
                    </div>
                </div>
            </article>
    );
}

export default MoviesCard;
