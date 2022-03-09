import '../App/App.css';
import './MoreMovies.css';

function MoreMovies({movies}) {

    return (
        <div className="more-movies app__container">
            { movies.length> 16 ? (<button className="more-movies__button">Ещё</button>) :
                (<div className="more-movies__without-button"/>) }
        </div>
    );
}

export default MoreMovies;
