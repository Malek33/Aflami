/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import MovieCard  from './MovieCard'
import axios from 'axios'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import '../styles/Home.css'

function Main(props) {

    // Upcoming Movies
    const [getUpcomingMovies, setGetUpcomingMovies] = useState([])
    const [getUpcomingMoviesLoading, setGetUpcomingMoviesLoading] = useState(false)
    useEffect(() => {
      axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
      .then(res => {
        setGetUpcomingMovies( res.data.results )
        setGetUpcomingMoviesLoading(true)
      })
    }, [] )


  // Trending Movies
  const [getTrendMovie, setGetTrendMovie] = useState([])
  const [getTrendMovieLoading, setGetTrendMovieLoading] = useState(false)
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
    .then(res => {
      setGetTrendMovie( res.data.results )
      console.log(res.data);
      setGetTrendMovieLoading(true)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // Discover Movies
  const [getDiscoverMovie, setGetDiscoverMovie] = useState([])
  const [getDiscoverMovieLoading, setGetDiscoverMovieLoading] = useState(false)
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=20108f1c4ed38f7457c479849a9999cc&language=en-us')
    .then(res => {
      setGetDiscoverMovie( res.data.results )
      setGetDiscoverMovieLoading(true)
    })
  }, [])

  // Top Rated Movies
  const [getTopRatedMovies, setGetTopRatedMovies] = useState([])
  const [getTopRatedMoviesLoading, setGetTopRatedMoviesLoading] = useState(false)
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
    .then(res => {
      setGetTopRatedMovies( res.data.results )
      setGetTopRatedMoviesLoading(true)
    })
  }, [] )

  // Popular Movies
  const [getPopularMovies, setGetPopularMovies] = useState([])
  const [getPopularMoviesLoading, setGetPopularMoviesLoading] = useState(false)
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
    .then(res => {
      setGetPopularMovies( res.data.results )
      setGetPopularMoviesLoading(true)
    })
  }, [] )

  var settings = {
    className: "slider-test",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const skeletonCardsNumbers = [ 0, 1, 2, 3, 4, 5, 6 ]
  const skeletonHome =<div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <div className='skeleton skeleton-title' style={{ margin: '0px 0px 15px 20px' }} ></div>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          { skeletonCardsNumbers.map( () => <div style={{ margin: '0px 40px 0px 40px' }}>
            <div className='skeleton skeleton-img'></div>
            <div className='skeleton skeleton-text' ></div>
            <div className='skeleton skeleton-text' ></div>
          </div>)}
        </div>
      </div>
  </div>

    const trendingMovies = <div>
    <Link to={`/movie/trendmov/1`} ><h1 style={{ margin: '0px 0px 15px 20px' }} >Trending Movies --&gt;</h1></Link>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
        {getTrendMovie.map( item => 
          <div key={'yo'}>
            <MovieCard 
                key={ item.id }
                id={ item.id }
                rating={ item.vote_average }
                star_rating={ item.vote_average / 2 }
                poster_path={ item.poster_path }
                title={ item.title }
                mediaType={ 'movie' }
                textColor={'black'} /> 
          </div>)}
      </Slider>
    </div>
    <br/>
  </div>

  const topRatedMovies = <div>
  <Link to={`/movie/topratedmov/1`} ><h1 style={{ margin: '0px 0px 15px 20px' }} >Top Rated Movies --&gt;</h1></Link>
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
      {getTopRatedMovies.map( item => 
        <div key={'yo'}>
          <MovieCard 
              key={ item.id }
              id={ item.id }
              rating={ item.vote_average }
              star_rating={ item.vote_average / 2 }
              poster_path={ item.poster_path }
              title={ item.title }
              mediaType={ 'movie' }
              textColor={'black'} /> 
        </div>)}
    </Slider>
  </div>
  <br/>
  </div>

  const discoverMovies = <div>
  <Link to={`/movie/discovermov/1`} ><h1 style={{ margin: '0px 0px 15px 20px' }} >Discover Movies --&gt;</h1></Link>
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
      {getDiscoverMovie.map( item => 
        <div key={'yo'}>
          <MovieCard 
              key={ item.id }
              id={ item.id }
              rating={ item.vote_average }
              star_rating={ item.vote_average / 2 }
              poster_path={ item.poster_path }
              title={ item.title }
              mediaType={ 'movie' }
              textColor={'black'} /> 
        </div>)}
    </Slider>
  </div>
  <br/>
  </div>

  const upcomingMovies = <div>
  <Link to={`/movie/upcommov/1`} ><h1 style={{ margin: '0px 0px 15px 20px' }} >Upcoming Movies --&gt;</h1></Link>
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
      {getUpcomingMovies.map( item => 
        <div key={'yo'}>
          <MovieCard 
              key={ item.id }
              id={ item.id }
              rating={ item.vote_average }
              star_rating={ item.vote_average / 2 }
              poster_path={ item.poster_path }
              title={ item.title }
              mediaType={ 'movie' }
              textColor={'black'} /> 
        </div>)}
    </Slider>
  </div>
  <br/>
  </div>

  const popularMoviies = <div>
  <Link to={`/movie/popmov/1`} ><h1 style={{ margin: '0px 0px 15px 20px' }} >Popular Movies --&gt;</h1></Link>
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
      {getPopularMovies.map( item => 
        <div key={'yo'}>
          <MovieCard 
              key={ item.id }
              id={ item.id }
              rating={ item.vote_average }
              star_rating={ item.vote_average / 2 }
              poster_path={ item.poster_path }
              title={ item.title }
              mediaType={ 'movie' }
              textColor={'black'} /> 
        </div>)}
    </Slider>
  </div>
  <br/>
  </div>

  return (
    <div>
      { !getTrendMovieLoading ? skeletonHome : trendingMovies }
      { !getTopRatedMoviesLoading ? skeletonHome : topRatedMovies }
      { !getDiscoverMovieLoading ? skeletonHome : discoverMovies }
      { !getUpcomingMoviesLoading ? skeletonHome : upcomingMovies }
      { !getPopularMoviesLoading ? skeletonHome : popularMoviies }
    </div>
  )
}

export default Main;
