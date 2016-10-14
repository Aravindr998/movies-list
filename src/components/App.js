import React, {Component} from 'react';
import noMovie from '../media/no-movie.png';
import '../styles/App.css';
import moviesService from '../movieService';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        moviesService.getMovies()
            .then((data) => {
                this.setState({
                    movies: data
                })
            });
    }

    render() {
        let moviesList = this.renderMoviesList(this.state.movies);
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <button className="btn btn-primary" onClick={this.loadData}>Load data</button>
                        <br/>
                        <br/>
                        {moviesList}
                    </div>
                </div>
            </div>
        );
    }

    renderMoviesList(movies) {
        if (!movies.length) return (
            <div>No movies loaded.</div>
        );

        return (
            <table className="container">
                <tbody>
                    {
                        movies.map(movie => this.renderMovie(movie))
                    }
                </tbody>
            </table>
        );
    }

    renderMovie(movie) {
        let posterUrl = movie.posterUrl ? movie.posterUrl : noMovie;

        return (
            <tr className="movie-row" key={movie.id}>
                <td className="number">{movie.id}.</td>

                <td className="image">
                    <img width={70} height={96} src={posterUrl} title={movie.title} alt={movie.title} />
                </td>

                <td className="title">
                    <a>{movie.title}</a>
                    <span> ({movie.year})</span>
                    <br/>
                    <span className="plot">{movie.plot}</span>
                    <br/>
                    <span>Dir: {movie.director} With: {movie.actors}</span>
                    <br/>
                    <span className="genre">{movie.genres.join(' | ')}</span>
                    <span className="runtime">{movie.runtime + ' mins.'}</span>
                </td>
            </tr>
        );
    }
}

export default App;