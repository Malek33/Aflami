import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard  from './MovieCard'
import ReactPaginate from 'react-paginate'
import { useHistory } from 'react-router-dom';

function MovieGender({match}) {
  const [currentPage] = useState(match.params.page)
  const [mediaType] = useState(match.params.mediaType)

  
    // Upcoming Movies
    const [getUpcomingMovies, setGetUpcomingMovies] = useState([])
    const [upcomingPages, setUpcomingPages] = useState(0)
    const [getUpcomingMoviesLoading, setGetUpcomingMoviesLoading] = useState(false)
    useEffect(() => {
      axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1' )
      .then(res => {
        setGetUpcomingMovies( res.data.results )
        setUpcomingPages( res.data.total_pages )
        setGetUpcomingMoviesLoading(true)
      })
    }, [] )


  // Trending Movies
  const [getTrendMovie, setGetTrendMovie] = useState([])
  const [trendPages, setTrendPages] = useState(0)
  const [getTrendMovieLoading, setGetTrendMovieLoading] = useState(false)
  useEffect(() => {
    axios.get( mediaType === 'movie' 
    ? `https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}` 
    : `https://api.themoviedb.org/3/trending/tv/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}`)
    .then(res => {
      setGetTrendMovie( res.data.results )
      setTrendPages( res.data.total_pages )
      setGetTrendMovieLoading(true)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // Discover Movies
  const [getDiscoverMovie, setGetDiscoverMovie] = useState([])
  const [discoverPages, setDiscoverPages] = useState(0)
  const [getDiscoverMovieLoading, setGetDiscoverMovieLoading] = useState(false)
  useEffect(() => {
    axios.get( mediaType === 'movie' 
    ? `https://api.themoviedb.org/3/trending/movie/day?api_key=20108f1c4ed38f7457c479849a9999cc&language=en-us&page=${currentPage}`
    : `https://api.themoviedb.org/3/trending/tv/day?api_key=20108f1c4ed38f7457c479849a9999cc&language=en-us&page=${currentPage}`)
    .then(res => {
      setGetDiscoverMovie( res.data.results )
      setDiscoverPages( res.data.total_pages )
      setGetDiscoverMovieLoading(true)
    })
  }, [])

  // Top Rated Movies
  const [getTopRatedMovies, setGetTopRatedMovies] = useState([])
  const [topRatedPages, setTopRatedTrendPages] = useState(0)
  const [getTopRatedMoviesLoading, setGetTopRatedMoviesLoading] = useState(false)
  useEffect(() => {
    axios.get( mediaType === 'movie' 
    ? `https://api.themoviedb.org/3/movie/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}`
    : `https://api.themoviedb.org/3/tv/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}`)
    .then(res => {
      setGetTopRatedMovies( res.data.results )
      setTopRatedTrendPages( res.data.total_pages )
      setGetTopRatedMoviesLoading(true)
    })
  }, [] )

  // Popular Movies
  const [getPopularMovies, setGetPopularMovies] = useState([])
  const [popularPages, setPopularTrendPages] = useState(0)
  const [getPopularMoviesLoading, setGetPopularMoviesLoading] = useState(false)
  useEffect(() => {
    axios.get( mediaType === 'movie'
      ? `https://api.themoviedb.org/3/movie/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/tv/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${currentPage}`)
      .then(res => {
      setGetPopularMovies( res.data.results )
      setPopularTrendPages( res.data.total_pages )
      setGetPopularMoviesLoading(true)
    })
  }, [] )

  let history = useHistory();
    const handlePageChange = (data) => {
      console.log(data.selected+1)
      history.push(`/${match.params.movieGender}/${data.selected+1}`)
      setTimeout( () => window.location.reload() , 1)
    }
  
  const movieGenderPage = ( movieGenre, page ) =>
  <div>
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
    {movieGenre.map( item => 
        <div style={{ margin: '10px' }}>
            <MovieCard 
            key={ item.id }
            id={ item.id }
            rating={ item.vote_average }
            star_rating={ item.vote_average / 2 }
            poster_path={ item.poster_path }
            title={ mediaType === 'movie' ? item.title : item.name }
            mediaType={ mediaType }
            textColor={'black'} /> 
        </div>)}
    </div>
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
    {movieGenre.length !== 0 ? <ReactPaginate
        previousLabel="<<"
        nextLabel=">>"
        breakLabel="..."
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination text-secondary'}
        pageClassName={'page-item text-secondary'}
        pageLinkClassName={'page-link text-secondary'}
        previousClassName={'page-item text-secondary'}
        previousLinkClassName={'page-link text-secondary'}
        nextClassName={'page-link text-secondary'}
        nextLinkClassName={'page-item text-secondary'}
        breakLinkClassName={'page-link text-secondary'}
        activeClassName={'active text-secondary'}
        forcePage={ currentPage }
        /> : null }
    </div>
  </div>

    return (
        <div>
          {match.params.movieGender === 'trendmov' ?  movieGenderPage( getTrendMovie, trendPages )  
          : match.params.movieGender === 'topratedmov' ? movieGenderPage( getTopRatedMovies, topRatedPages ) 
          : match.params.movieGender === 'discovermov' ? movieGenderPage( getDiscoverMovie, discoverPages ) 
          : match.params.movieGender === 'upcommov' ? mediaType === 'movie' ? movieGenderPage( getUpcomingMovies, upcomingPages ) : 'nothing here...'
          : match.params.movieGender === 'popmov' ? movieGenderPage( getPopularMovies, popularPages ) 
          : null}
        </div>
    )
}

export default MovieGender
