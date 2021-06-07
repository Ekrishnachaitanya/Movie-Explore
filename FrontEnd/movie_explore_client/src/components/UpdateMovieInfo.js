import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

class UpdateMovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      release_year: "",
      genre_name: "",
      rating: "",
      err:'',
      err_rating:''
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/movies/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          name: res.data.name,
          release_year: res.data.release_year,
          genre_name: res.data.genre.name,
          rating: res.data.rating,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateMovieInfo");
      });
  }

  onChange = (e) => {
    let nam = e.target.name;
    let err = '';
    let err_rating='';
    if(nam==='release_year'){
      if (e.target.value.match("[1-9]{4}") == null) {
        err = <strong style={{color:"red"}}>Enter Valid Year</strong>;
        this.setState({err:err});
      }else{
        this.setState({err:''});
      }
    }
    if(nam==='rating'){
      if(!Number(e.target.value) || !(e.target.value>0 && e.target.value<=10)){
        err_rating = <strong style={{color:"red"}}>Enter Rating Between 0 to 10</strong>;
        this.setState({err_rating:err_rating});
      }else{
        this.setState({err_rating:''})
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.err==='' && this.state.err_rating===''){
    const data = {
      name: this.state.name,
      release_year: this.state.release_year,
      genre: { name: this.state.genre_name },
      rating: this.state.rating,
    };

    axios
      .put(
        "http://localhost:8082/api/movies/" + this.props.match.params.id,
        data
      )
      .then((res) => {
        this.props.history.push("/show-movie/" + this.props.match.params.id);
      })
      .catch((err) => {
        console.log("Error in UpdateMovieInfo!");
      });
    }
  };

  render() {
    return (
      <div className="UpdateMovieInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/Thriller" className="btn btn-outline-warning float-left">
                Show Movie List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Movie</h1>
              <p className="lead text-center">Update Movie's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name of the Movie"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="release_year">Release Year</label>
                <input
                  type="text"
                  placeholder="Release Year"
                  name="release_year"
                  className="form-control"
                  maxLength="4"
                  value={this.state.release_year}
                  onChange={this.onChange}
                />
                {this.state.err}
              </div>

              <div className="form-group">
                <label htmlFor="genre_name">Genre Name</label>
                <select value={this.state.genre_name} onChange={this.onChange} name="genre_name" className="form-control">
                  <option value="Comedy">Comedy</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Action">Action</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                  <option value="ScienceFriction">ScienceFriction</option>
                  <option value="Crime">Crime</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                  type="text"
                  placeholder="Describe this movie"
                  name="rating"
                  className="form-control"
                  maxLength="3"
                  value={this.state.rating}
                  onChange={this.onChange}
                />
                {this.state.err_rating}
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Movie
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateMovieInfo;
