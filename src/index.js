import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import InfiniteMovies from './components/InfiniteMovies';
import CardDetails from './components/CardDetails';
import SearchData from './components/SearchData';
import NavBar from './components/NavBar';
import TvShows from './components/TvShows';
import MovieGender from './components/MovieGender';
import P404 from './components/P404';
// import TestZone from './components/TestZone';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NavBar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TvShows} />
      <Route path="/movieDetails/:mediatype/:id" component={CardDetails} />
      <Route path='/infiniteMovies' component={InfiniteMovies} />
      <Route path='/SearchResults/:movieName/:page' component={SearchData} />
      <Route path='/:mediaType/:movieGender/:page' component={MovieGender} />
      {/* <Route path="/test" component={TestZone} /> */}
      <Route path="*" component={P404} />
    </Switch>
  </Router>
);
reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
