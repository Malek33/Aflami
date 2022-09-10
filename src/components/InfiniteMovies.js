/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import NavBar from './NavBar'

function InfiniteMovies() {
// (oldTrendMovie) =>  [...oldTrendMovie, res.data.results]

    // Trending Movies
    const [getTrendMovie, setGetTrendMovie] = useState([])
    const [getArray, setGetArray] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=${page}`)
        .then(res => {
            setGetTrendMovie(res.data.results)
            setGetArray([...getArray, ...res.data.results])
            // console.log(res.data.results)
            setPage( (oldPage) => 1 + oldPage )
        })
        .catch(err => {
            console.error(err)
        })
}, [page])
    return (
        <div>
            <NavBar/>
        <h1>Explore Movies</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* { console.log(getTrendMovie) } */}
            {/* { console.log('slm',getArray) } */}
            {getArray.map( item => 
                <MovieCard
                    key={item.id}
                    margin={'10px'}    
                    rating={ item.vote_average }
                    star_rating={ item.vote_average / 1.6 }
                    poster_path={ item.poster_path }
                    title={ item.title } 
                /> )}
                <button onClick={() => setPage( (oldPage) => 1 + oldPage )} >+</button>
                {/* {console.log(page)} */}
                
          </div>
    </div>
  )
}

export default InfiniteMovies