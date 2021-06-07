import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const MovieCard = (props) => {
  const movie = props.movie;

  return (
    <Link to={`/show-movie/${movie._id}`}>
      <div className="card-container">
        <img
          src={movie.imageURL}
          alt=""
        />
        <div className="desc">
          <h2 style={{ color: "rgb(15, 242, 193)" }}>
            <span style={{ color: "white" }}>Name: </span>
            {movie.name}
          </h2>
          <h2 style={{ color: "rgb(15, 242, 193)" }}>
            <span style={{ color: "white" }}>Genre: </span>
            {movie.genre.name}
          </h2>
          <h2 style={{ color: "rgb(15, 242, 193)" }}>
            <span style={{ color: "white" }}>Rating: </span>
            {movie.rating}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
