import React from 'react'
import { Link } from "react-router-dom";
import ReactStars from 'react-stars'
import '../styles/Card.css'

function MovieCard(props) {
  // console.log('Card:', props.id)
  return (
    <div style={{ width: '150px', margin: props.margin }}>
      <Link to={`/movieDetails/${props.mediaType}/${props.id}`}><div onClick={ () => setTimeout( () => window.location.reload() , 1) } title={ props.title } href={ props.movie_link }>

        <p className='card-movietype'>{props.mediaType}</p>
          <img height={ props.poster_path === null ? '220px' : null } width='150px' style={{ borderRadius: '10px'}}
           src={ props.poster_path === null || props.mediaType === 'person' ? 'https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?w=826&t=st=1662641664~exp=1662642264~hmac=b3019fca56d83b405be6fe011424b06b35b9519676a7cd45da5ca9fdc4dda20b'
            : 'https://image.tmdb.org/t/p/w500' + props.poster_path } alt={ props.title } />
          <p className='movie-title' style={{ fontSize: '15px', color: props.textColor }}>{ props.title }</p>
        </div></Link>
          <div className='rate-things'>
              { props.star_rating === undefined ? null : <ReactStars key={props.id} half={true} edit={false} count={5} value={ props.star_rating } size={24} color2={'#ffd700'} className='ReactStars' />}
              { props.rating === undefined ? null : <p style={{ fontSize: '10px' }} className='rating'>{'('+ props.rating +')'}</p>}
          </div>
    </div>
  )
}

export default MovieCard