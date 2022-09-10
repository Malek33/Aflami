/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'
import { Link } from "react-router-dom";
import axios from 'axios'
// import SearchData from './SearchData'

function NavBar(props) {

  const [searchResults, setSearchResults] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&query=${keyword.toLowerCase()}&page=1&include_adult=false`)
    .then(res => {
      setSearchResults(res.data.results)
    })
  }, [keyword, keyword.length])

  return (
    <nav className="navbar">
        <Link style={{ color: 'white' }} to="/"><div className="logo">AFLAMI</div></Link>
        <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
            <div className="menu">
                <Link to="/"><li><a>Movies</a></li></Link>
                <Link to="/tv"><li><a>TV Shows</a></li></Link>
                {/* <li className="services">
                <a href="#">Services</a>
                <ul className="dropdown">
                    <li><a href="#">Dropdown 1 </a></li>
                    <li><a href="#">Dropdown 2</a></li>
                    <li><a href="#">Dropdown 2</a></li>
                    <li><a href="#">Dropdown 3</a></li>
                    <li><a href="#">Dropdown 4</a></li>
                </ul>
                </li> */}
                <form className="searchbar">
                    <input 
                      type={'text'} className="searchbar__input" name="q" list="brow" placeholder='Search for anymovie here..' onInput={ event => {setKeyword(event.target.value)}} />
                    <datalist id="brow">
                      {searchResults.map(result => (
                        <option value={result.original_title} key={result.id}>{result.original_title}</option>
                      ))}
                    </datalist>
                    <Link onClick={ () => setTimeout( () => window.location.reload() , 1) } to={`/SearchResults/${keyword}/1`}><button className="searchbar__button"  ><i className="material-icons">search</i></button></Link>
                </form>
            </div>
            {console.log(keyword)}
        </ul>
    </nav>
  )
}

export default NavBar