import './MoviesCard.css';
import '../App/App.css';
import {useLocation} from "react-router-dom";
import {useState} from 'react';
import film from '../../images/film.jpg'
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function MoviesCard({movie, onSaveMovie}) {

    const [isSaved, setIsSaved] = useState(false);
    const [savedMovie, setSavedMovie] = useState();

    const address = useLocation();
    const baseUrl = 'https://api.nomoreparties.co'

    const handleOpenLink = () => {
        window.open(movie.trailerLink);
    }

    const parseDuration = () => {
        let hours;
        let minutes;
        hours = Math.trunc(movie.duration / 60)
        minutes = movie.duration % 60
        if (movie.duration > 59 && minutes !== 0) {
            return `${hours}ч ${minutes}мин`
        } else if (movie.duration > 59 && minutes === 0) {
            return `${hours}ч`}
        else return `${minutes}мин`
    }

    const handleSaveMovie = () => {
        onSaveMovie(movie);
    }

    return (
            <article className="movies-card">
                <img src={`${baseUrl}${movie.image.url}`} alt={`${movie.nameRU}`} className="movies-card__image"
                onClick={handleOpenLink}/>
                <div className="movies-card__caption">
                    <div className="movies-card__text">
                    <h2 className="movies-card__description">{movie.nameRU}</h2>
                    <span className="movies-card__duration">{parseDuration()}</span>
                    </div>
                    <div>
                    {address.pathname === '/movies' &&
                    (<div className="movies-card__like" onClick={!isSaved ? handleSaveMovie : null }>
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
