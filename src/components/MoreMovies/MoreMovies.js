import '../App/App.css';
import './MoreMovies.css';

function MoreMovies({movies, addMovies}) {

    return (
        <div className="more-movies app__container">
            { movies.length > 4 ? (<button className="more-movies__button" onClick={addMovies}>Ещё</button>) :
                (<div className="more-movies__without-button"/>) }
        </div>
    );
}

export default MoreMovies;
