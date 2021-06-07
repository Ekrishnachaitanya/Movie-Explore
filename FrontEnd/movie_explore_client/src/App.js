import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './App.css';

import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import UpdateMovieInfo from './components/UpdateMovieInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/'> <Redirect to="/Thriller" component={ShowMovieList} /></Route>
          <Route path='/edit-movie/:id' component={UpdateMovieInfo} />
          <Route path='/show-movie/:id' component={ShowMovieDetails} />
          <Route exact path='/:genre_name' component={ShowMovieList} />
        </div>
      </Router>
    );
  }
}

export default App;