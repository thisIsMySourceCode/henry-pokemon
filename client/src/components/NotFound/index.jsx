import bg    from './bg.png'
import home  from './home.png'
import pika  from './pikachu.gif'
import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {

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

<p style={{
  zIndex:'3',fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',background:'none',fontSize:'82pt',textTransform:'capitalize',position:'absolute',top:'0',left:'5rem',color:'white',textShadow:'#222 1px 0 10px'
}}>Pokemon not found</p>


<img  style={{position:'absolute',bottom:'12rem',right:'-5rem'}} src={pika}/>

<Link to='/Home'><img  style={{position:'absolute',bottom:'-1rem',right:'-5rem'}} src={home}/></Link>
</div>
</>) }

export default NotFound;
