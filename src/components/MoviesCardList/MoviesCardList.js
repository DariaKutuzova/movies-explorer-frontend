import './MoviesCardList.css';
import '../App/App.css'
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({movies}) {

    return (
        <div className="movies-cards app__container" aria-label="Фильмы галерея">
            { movies.length === 0 ? (<p className="movies-cards__nomovies">Поиск не дал результатов :(</p>) :
                movies.map((movie) => (
                    <MoviesCard movie={movie}
                                key={movie.id}
                    />
                )
            )}
        </div>
    );
}

export default MoviesCardList;
