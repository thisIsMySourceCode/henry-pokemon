import React from 'react'
//import './Countrystyle.css';

const generateKey = (pre) => {
  return `${ pre.name }_${ new Date().getTime()}_${ new Date().getMilliseconds() }`;
}

function Type(prop){
  return (
    <span className={prop.name}>{prop.name}</span>
  )
}

const Pokemon = ({ name, sprite, types}) => {return(
<div>
  <p className='name'><b>{name}</b></p>
  <img src= {sprite} alt= {name + " pokemon"} height="200px"/>
  <p>{types.map((type)=><Type key={ generateKey(type) }  name={type.name}/>)}</p>
</div>
)}

export default Pokemon
