import bg   from './bg.png'
import home from './home.png'
import load from './loading.gif'
import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPokeByParams,resetDetails } from '../../actions'

const Details = () => {
const 
pokemon = useSelector((state) => state.pokeById),
{ id } = useParams(),
dispatch = useDispatch()
useEffect(() => {
  dispatch(getPokeByParams(id))
  return () => {
    dispatch(resetDetails())
  }
}, [dispatch])


const Hide = () => {
  const loader = document.getElementById('loading')
        loader.style.opacity = "0"  
        return ''
  }

return (<> 
<div style={{
    height: '97%',
     width: '99%',
  position: 'absolute',
       top: '0',
      left: '0',
      margin: '0',
      overflow: 'hidden',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      border: '5px solid black'
}}>

<img id='loading' style={{position:'absolute',bottom:'15rem',left:'14.5rem',Zindex:'-2'}} src={load} />

{pokemon.id ? (<>
<p style={{
  zIndex:'3',fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',background:'none',fontSize:'86pt',textTransform:'capitalize',position:'absolute',top:'0',left:'5rem',color:'white',textShadow:'#222 1px 0 10px'
}}>{pokemon.name}</p>
<img style={{position:'absolute',left:'5.5rem',bottom:'1rem'}} src={pokemon.sprite} width='645vw' height='600vh' alt='{pokemon.name}'/>
<table style={{fontFamily: 'Arial Black, Arial, Helvetica, sans-serif', fontSize:'32pt', position:'absolute',right:'5rem',top:'2rem',color:'#222'}}>
<tbody>
  <tr><td>Index</td><td>{pokemon.id}</td></tr>
  <tr><td>Height</td><td>{pokemon.height}</td></tr>
  <tr><td>Weight</td><td>{pokemon.weight}</td></tr>
  <tr><td>HP</td><td>{pokemon.hp}</td></tr>
  <tr><td>Attack</td><td>{pokemon.attack}</td></tr>
  <tr><td>Defense</td><td>{pokemon.defense}</td></tr>
  <tr><td>Speed</td><td>{pokemon.speed}</td></tr>
  <tr><td>Type</td><td>{pokemon.types.map((type)=> <span style={{marginRight:'1.5rem'}} key={type.name}>{type.name}</span> )}</td></tr>
  </tbody>
</table>

<Hide/>

<Link to='/Home'><img  style={{position:'absolute',bottom:'-1rem',right:'-5rem'}} src={home}/></Link>
</>) : '' } 
</div>
</>) }

export default Details;
