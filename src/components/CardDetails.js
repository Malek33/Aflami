/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/CardDetails.css'
import ActorsCards from './ActorsCards'
import ReactStars from 'react-stars'
import Slider from "react-slick";
import MovieCard  from './MovieCard'



function CardDetails({match}) {
  const id = match.params.id
  const mediaType = match.params.mediatype
  const data = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=b5d2609c326586f7f753f77b085a0b31&append_to_response=images,credits`
  const similar = `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`
  const dataStream = `https://2embed.org/embed/${id}`

  const [getMovie, setGetMovie] = useState([])
  const [getMovieBackdrops, setGetMovieBackdrops] = useState([])
  const [getMoviePosters, setGetMoviePosters] = useState([])
  const [getMovieDesc, setGetMovieDesc] = useState('')
  const [getMovieActors, setGetMovieActors] = useState([])
  const [getMovieLogo, setGetMovieLogo] = useState('')
  const [getMovieGenre, setGetMovieGenre] = useState([])
  const [getMovieSeasons, setGetMovieSeasons] = useState([])
  const [getMovieFirstSeasonEpisodesCount, setGetMovieFirstSeasonEpisodesCount] = useState([])
  const [getMovieLoader, setGetMovieLoader] = useState(true)
  useEffect(() => {
      axios.get(data)
      .then(res => {
          console.log('slm', res)
          setGetMovie( res.data )
          setGetMovieBackdrops( res.data.images.backdrops[ Math.floor(Math.random() * res.data.images.backdrops.length) ].file_path )
          setGetMoviePosters( res.data.poster_path )
          setGetMovieDesc( res.data.overview )
          setGetMovieActors( res.data.credits.cast )
          setGetMovieLogo(res.data.images.logos[0].file_path)
          setGetMovieGenre(res.data.genres)
          setGetMovieSeasons(res.data.seasons)
          setGetMovieFirstSeasonEpisodesCount(res.data.seasons[0].episode_count)
          setGetMovieLoader(false)
        })
      .catch(err => {
          console.log(err)
      })
  }, [])

  const [getSimilarMovies, setGetSimilarMovies] = useState([])
  const [getSimilarMoviesLoader, setGetSimilarMoviesLoader] = useState(true)
  useEffect(() => {
    axios.get(similar)
    .then(res => {
      setGetSimilarMovies(res.data.results)
      setGetSimilarMoviesLoader(false)
    })
    .catch(err => {
        console.log(err)
      })
    }, [])
    //usememo
    
    console.log(getMovie)
    
    // console.log(getMovie)
    // console.log(getMovieActors)
    const imageTest = `https://image.tmdb.org/t/p/original${getMovieBackdrops}`
    let i = 4

    
    const myStyle={
      backgroundImage: `url(${imageTest})`,
      backgroundColor: 'black',
      height:'100%',
      width:'100vw',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      opacity: 0.5,
      filter: 'alpha(opacity=30)',
      zIndex: '0',
    };

  var settings = {
    className: "slider-test2",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: mediaType === 'tv' ? getMovieSeasons.length > 4 ? 4 : 2 : 4,
    slidesToScroll: mediaType === 'tv' ? 1 : 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: mediaType === 'tv' ? getMovieSeasons.length > 3 ? 3 : 2 : 3,
          slidesToScroll: mediaType === 'tv' ? 1 : 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

const cardDetailsHome = <div>
<div className='bigDiv-CardDetails' >
  <div style={ myStyle } ></div>
  <div style={{ zIndex: '9', position: 'relative' }} className="card-details">
      <div className='right-aside'>
        <img className='posterImg' src={`https://image.tmdb.org/t/p/original/${getMoviePosters}`} alt={getMovie.title} />
        <hr className='hr-cardDetails'/>
        <p title={getMovieDesc} className='desc' style={{ textAlign: 'center' }}>{getMovieDesc}</p>
        <div className='actors-field'>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            {getMovieActors.slice(0, i).map( item => item.known_for_department === "Acting" ? <ActorsCards key={getMovieActors.indexOf(item)} ActorImg={item.profile_path} orgName={item.original_name} character={item.character} /> : i++)}
          </div>
          <br/>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            {getMovieActors.slice(i, 8).map( item => <ActorsCards key={getMovieActors.indexOf(item)} ActorImg={item.profile_path} orgName={item.original_name} character={item.character} />)}
          </div>
          <br/>
          {/* <button style={{ backgroundColor: 'transparent', color: 'white', float: 'right' }}>See more &gt;</button> */}
        </div>
      </div>
  </div>
  
  <div>
      <img className='movie-logo' src={`https://image.tmdb.org/t/p/original${getMovieLogo}`} alt={`movie logo`}/>
  </div>

  
  <div className='left-aside-title'>
    <h1 style={{ zIndex: '100' }}>{mediaType === 'movie' ? getMovie.title : getMovie.name}</h1>
    {/* <h4>Watch Movies Online</h4>wa9teh el film tla3 */}
    <div style={{ display: 'flex' }}>
      { getMovieGenre.map( item => <p key={item.id} style={{  marginRight: '10px', color: 'white' }}>{item.name}</p> ) }
    </div>
    <ReactStars key={getMovie.id} half={true} edit={true} count={5} value={ getMovie.vote_average/2 } size={24} />
    {console.log(getMovie)}
    <br/>
  </div>
  
  <div className='left-aside-similar-movies' style={{color: 'white', textShadow: '0 0 10px black', position: 'absolute', top: '55vh', left: '4vw'}}>
  {/* <h1>{item.name === 'Specials' ? null : item.name}</h1> */}
    { getMovieSeasons === undefined || getMovieSeasons.length === 1 ? <h1>Similar</h1> : <h1>Seasons</h1>}
    <div style={{ display: 'flex' }}>
    <Slider style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...settings}>
      { mediaType === 'tv' ? getMovieSeasons === undefined || getMovieSeasons.length === 1 ? null : getMovieSeasons.map( item => 
        <div key={'yo'}>
        <MovieCard 
            key={ item.id }
            id={ item.id }
            rating={ item.episode_count }
            poster_path={ item.poster_path }
            title={ item.name }
            textColor={'white'}
            /> 
      </div>) : 
      getSimilarMovies.map( item => 
        <div key={'yo'}>
        <MovieCard 
            key={ item.id }
            id={ item.id }
            rating={ item.rating }
            poster_path={ item.poster_path }
            title={ item.title }
            mediaType={mediaType}
            textColor={'white'}
            /> 
        </div>
        )}
    </Slider>
    </div>
  </div>
</div>

{/* player ma 5ir 'https://autoembed.to' */}
<div style={{ display: 'flex', justifyContent: 'center' }} className="video-responsive">
  {/* <iframe
    width="853vw"
    height="480vh"
    src={dataStream}
    frameBorder="0"
    allowFullScreen
    title="Embedded youtube"
    onLoad={()=> setTimeout( console.clear() , 1)}
  /> */}
</div>
  </div>

  const skeletonCubeNumbers = [ 0, 1, 2, 3, 4 ]

const skeletonMovieDetails = <div style={{ backgroundColor: 'white'}}>
  <div style={{backgroundColor: 'wihte', width: '100vw', height: '91vh'}}>
    <div style={{ position: 'relative', left: '4vw', top: '15vh' }}>
      <div className='skeleton skeleton-title'></div>
      <div className='skeleton skeleton-text' style={{ width: '25%' }}></div>
      <div className='skeleton skeleton-text' style={{ width: '10%' }}></div>
      <br/><br/><br/>
      <br/><br/><br/>
      <div className='skeleton skeleton-title' style={{ width: '10%', marginBottom: '20px' }}></div>
      <div style={{ display: 'flex' }}>
      { skeletonCubeNumbers.map( () => <div style={{ margin: '0px 10px 0px 10px' }}>
        <div className='skeleton skeleton-img'></div>
        <div className='skeleton skeleton-text' ></div>
        <div className='skeleton skeleton-text' ></div>
      </div>)}</div>
    </div>
  </div>
  <div style={{ backgroundColor: 'white', width: '35vw', height: '100vh', position: 'absolute', top: '0vh', right: '0px' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton skeleton-img' style={{ marginTop: '15vh' }}></div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton' style={{ marginTop: '5vh', width: '60%', height: '0.3vh' }}></div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton' style={{ marginTop: '5vh', width: '80%', height: '2vh', borderRadius: '5px' }}></div>
    </div><div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton' style={{ marginTop: '1vh', width: '60%', height: '2vh', borderRadius: '5px' }}></div>
    </div><div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton' style={{ marginTop: '1vh', width: '70%', height: '2vh', borderRadius: '5px' }}></div>
    </div><div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='skeleton' style={{ marginTop: '1vh', width: '60%', height: '2vh', borderRadius: '5px' }}></div>
    </div>

    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2vw 5vw 0vw 5vw' }}>
        { skeletonCubeNumbers.map( () => <div style={{textAlign: 'center'}}>
          <div className='skeleton' style={{ height: '7vh', width: '7vh', borderRadius: '50vh' }}></div>
          <div className='skeleton' style={{ height: '1vh', width: '5vh', borderRadius: '5px', marginTop: '5px', marginLeft: '10px' }}></div>
        </div>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2vw 5vw 0vw 5vw' }}>
        { skeletonCubeNumbers.map( () => <div style={{textAlign: 'center'}}>
          <div className='skeleton' style={{ height: '7vh', width: '7vh', borderRadius: '50vh' }}></div>
          <div className='skeleton' style={{ height: '1vh', width: '5vh', borderRadius: '5px', marginTop: '5px', marginLeft: '10px' }}></div>
        </div>)}
      </div>
    </div>

  </div>
  </div>

const episodesButtons = <div>

</div>

return (
  <div>
    { getMovieLoader && getSimilarMoviesLoader ? skeletonMovieDetails : cardDetailsHome }
    { episodesButtons }
  </div>
  )
}

export default CardDetails