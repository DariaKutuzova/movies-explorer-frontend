import './MoviesCardList.css';
import '../App/App.css'
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({movies, startState, onSaveMovie}) {

    return (
        <div className="movies-cards app__container" aria-label="Фильмы галерея">
            { movies.length === 0 ? (!startState ? (<p className="movies-cards__nomovies">Поиск не дал результатов :(</p>)
                : <p className="movies-cards__nomovies">Начните поиск фильмов</p>):
                movies.map((movie) => (
                    <MoviesCard movie={movie}
                                key={movie.id}
                                onSaveMovie={onSaveMovie}
                    />
                )
            )}
        </div>
    );
}

export default MoviesCardList;
