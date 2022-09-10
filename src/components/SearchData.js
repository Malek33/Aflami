/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard  from './MovieCard'
import ReactPaginate from 'react-paginate'
import { useHistory } from 'react-router-dom';


function SearchData({match}) {
    console.log('SearchData:', match.params.movieName)
    const [keyword] = useState(match.params.movieName);
    const [searchResults, setSearchResults] = useState([])
    const [pages, setPages] = useState(0)
    const [currentPage] = useState(match.params.page)

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/search/multi?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&query=${keyword.toLowerCase()}&page=${currentPage}`)
      .then(res => {
        setSearchResults(res.data.results)
        setPages(res.data.total_pages)
        console.log(res.data)
      })
    }, [keyword, keyword.length])


    // let buttons = []
    // for (let index = 0; index < pages; index++) {
    //   buttons.push(<div style={{ backgroundColor: '#9c9c9c',
    //           width: '50px', height: '50px', borderRadius: '10px',
    //           color: 'black', display: 'flex', justifyContent: 'center',
    //           alignItems: 'center', cursor: 'pointer', margin: '10px' }}
    //            id={index+1} onClick={ event => {setCurrentPage(event.target.id)} }   >{index+1}</div>)
    //           console.log('Buttons:', buttons)
    //           console.log('Pages:', index)
    //           console.log('CurrentPage:', currentPage)
    // }

    let history = useHistory();
    const handlePageChange = (data) => {
      console.log(data.selected+1)
      history.push(`/SearchResults/${keyword}/${data.selected+1}`)
      setTimeout( () => window.location.reload() , 1)
    }

    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {searchResults.map( item => item.media_type === "person" ? null :
            <div style={{ margin: '10px' }}>
              <MovieCard 
                  key={ item.id }
                  id={ item.id }
                  rating={ item.vote_average }
                  star_rating={ item.vote_average / 2 }
                  poster_path={ item.poster_path }
                  title={ item.media_type === 'movie' ? item.title : item.name }
                  mediaType={ item.media_type }
                  textColor={'black'} /> 
            </div>
            )}
          </div>
          {console.log("searchReuslts:", searchResults)}
          {/* { searchResults.length === 0 ? <h1 style={{textAlign: 'center'}} >Sorry there is no such a thing called "{keyword}"</h1> : null} */}
          {/* setTimeout( () => window.location.reload() , 1) */}
          { searchResults.length === 0 ? <h1 style={{textAlign: 'center'}} >Searching for "{keyword}"...</h1> : null }
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {/* {buttons} */}
            {  searchResults.length !== 0 ? <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            breakLabel="..."
            pageCount={pages}
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
    )
}


// eslint-disable-next-line no-lone-blocks
{/* <div style={{ backgroundColor: '#9c9c9c',
              width: '50px', height: '50px', borderRadius: '10px',
              color: 'black', display: 'flex', justifyContent: 'center',
              alignItems: 'center', cursor: 'pointer' }}>1</div> */}

export default SearchData
