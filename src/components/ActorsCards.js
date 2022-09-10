import React from 'react'

function ActorsCards(props) {
  return (
    <div style={{textAlign: 'center', width: '10vw'}}>
      {/* <h1 style={{position: 'absolute', backgroundColor: 'white'}}>Bounjour les bizbiz</h1> */}
      <img style={{ height: '7vh', width: '7vh', objectFit: 'cover', borderRadius: '50vh' }} src={`https://image.tmdb.org/t/p/original${props.ActorImg}`} alt={`actor name`} ></img>
      <strong><p style={{color: 'white', fontSize: '1.5vh'}}>{props.orgName}</p></strong>
      <p style={{color: 'white', fontSize: '1.5vh'}}>{`(${props.character})`}</p>
    </div>
  )
}

export default ActorsCards