import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Link } from "react-router-dom";

class ShowMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genre_name:this.props.match.params.genre_name
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/movies/genre/'+this.state.genre_name)
      .then(res => {
        this.setState({
          movies: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowMovieList');
      })
  };

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.genre_name !== this.props.match.params.genre_name){
      axios
      .get('http://localhost:8082/api/movies/genre/'+this.props.match.params.genre_name)
      .then(res => {
        this.setState({
          movies: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowMovieList');
      });
    }
  }

  render() {
    const movies = this.state.movies;
    let movieList;

    if(!movies) {
      movieList = "there is no movie record!";
    } else {
        movieList = movies.map((movie, k) =>
        <MovieCard movie={movie} key={k} />
      );
    }

    return (
      <div className="ShowMovieList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Movies List</h2>
            </div>
              <Link to={{ pathname: '/Thriller', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Thriller
              </Link>&nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Comedy', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Comedy
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Fantasy', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Fantasy
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Action', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Action
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Romance', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Romance
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Horror', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
                Horror
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/ScienceFriction', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
              Science Friction
              </Link>
              &nbsp; &nbsp; &nbsp;  
              <Link to={{ pathname: '/Crime', state: 'flushDeal' }} className="btn btn-outline-warning float-left">
              Crime
              </Link>
          </div>

          <div className="list">
                {movieList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowMovieList;