import './MoviesCard.css';
import '../App/App.css';
import {useLocation} from "react-router-dom";
import {useState} from 'react';

function MoviesCard({movie, onSaveMovie, onDeleteMovie}) {
    const [isSaved, setIsSaved] = useState(movie.saved);

    const address = useLocation();

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
            return `${hours}ч`
        } else return `${minutes}мин`
    }

    const handleSaveMovie = (e) => {
        console.log(e)
        onSaveMovie(movie);
    }

    const handleDeleteMovie = () => {
        console.log(movie)
        console.log(onDeleteMovie)
        let savedId = movie.savedId ? movie.savedId : movie.id;
        onDeleteMovie(savedId);
    }

    const handleCheck = () => {
        setIsSaved(!isSaved)
    }

    return (
        <article className="movies-card">
            <img src={(`${movie.image.url ? movie.image.url : movie.image}`)} alt={`${movie.nameRU}`}
                 className="movies-card__image"
                 onClick={handleOpenLink}/>
            <div className="movies-card__caption">
                <div className="movies-card__text">
                    <h2 className="movies-card__description">{movie.nameRU}</h2>
                    <span className="movies-card__duration">{parseDuration()}</span>
                </div>
                <div>
                    {address.pathname === '/movies' &&
                        (<div className="movies-card__like">
                            <input id={movie.id} type="checkbox" name="check" className="movies-card__like-button"
                                   aria-label="Нравится"
                                   onChange={handleCheck}
                                   checked={isSaved}/>
                            <label
                                htmlFor={movie.id}
                                className="movies-card__like-newbutton"
                                onClick={!isSaved ? handleSaveMovie : handleDeleteMovie}
                            >
                            </label>
                        </div>)}
                    {address.pathname === '/saved-movies' &&
                        (<div className="movies-card__delete">
                            <button className="movies-card__delete-button"
                                    onClick={handleDeleteMovie}/>
                        </div>)
                    }
                </div>
            </div>
        </article>
    );
}

export default MoviesCard;
