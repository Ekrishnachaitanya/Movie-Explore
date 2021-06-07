import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

class showMovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: { name: "", release_year: "", genre: { name: "" }, rating: 0, imageURL:''},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/movies/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          movie: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowMovieDetails");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("http://localhost:8082/api/movies/" + id)
      .then((res) => {
        this.props.history.push("/"+this.state.movie.genre.name);
      })
      .catch((err) => {
        console.log("Error form ShowMovieDetails_deleteClick");
      });
  }

  render() {
    const movie = this.state.movie;
    //console.log(movie.imageURL);
    let MovieItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Name</td>
              <td>{movie.name}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Release Year</td>
              <td>{movie.release_year}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Genre Name</td>
              <td>{movie.genre.name}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Rating</td>
              <td>{movie.rating} / 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="ShowMovieDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/Thriller" className="btn btn-outline-warning float-left">
                Show Movie List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Movie's Record</h1>
              <p className="lead text-center">View Movie's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div>{MovieItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button" 
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this, movie._id)}
              >
                Delete Movie
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/edit-movie/${movie._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Movie
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default showMovieDetails;
