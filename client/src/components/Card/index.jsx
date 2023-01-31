import React from 'react'
import { Link } from 'react-router-dom';

import bug      from './icons/bug.png'                                                              
import dark     from './icons/dark.png'                                                             
import dragon   from './icons/dragon.png'                                                           
import electric from './icons/electric.png'                                                         
import fairy    from './icons/fairy.png'                                                            
import fighting from './icons/fighting.png'                                                         
import fire     from './icons/fire.png'                                                             
import flying   from './icons/flying.png'                                                           
import ghost    from './icons/ghost.png'                                                            
import grass    from './icons/grass.png'                                                            
import ground   from './icons/ground.png'                                                           
import ice      from './icons/ice.png'                                                              
import normal   from './icons/normal.png'                                                           
import poison   from './icons/poison.png'                                                           
import psychic  from './icons/psychic.png'                                                          
import rock     from './icons/rock.png'                                                             
import shadow   from './icons/shadow.png'                                                           
import steel    from './icons/steel.png'                                                            
import unknown  from './icons/unknown.png'                                                          
import water    from './icons/water.png' 

import './style.css';

const generateKey = (pre) => { return `${ pre.name }_${ new Date().getTime()}_${ new Date().getMilliseconds() }` }
const Type = (prop) => 
{ 

const imgs = {
bug      : bug      ,                                                                
dark     : dark     ,                                                          
dragon   : dragon   ,                                                        
electric : electric ,                                                     
fairy    : fairy    ,                                                      
fighting : fighting ,                                                  
fire     : fire     ,                                                       
flying   : flying   ,                                                   
ghost    : ghost    ,                                                      
grass    : grass    ,                                                      
ground   : ground   ,                                                     
ice      : ice      ,                                                        
normal   : normal   ,                                                     
poison   : poison   ,                                                     
psychic  : psychic  ,                                                    
rock     : rock     ,                                                       
shadow   : shadow   ,                                                     
steel    : steel    ,                                                  
unknown  : unknown  ,                                                  
water    : water    ,
}

let img = imgs[prop.name];
//return (<div className='cardType'><img width='100px' src={img} alt={img}/></div>) 
//  return (<span className='cardPrueba'>{prop.name}</span>) 
//return (<div className='cardType'><img width='100px' src={img} alt={img}/></div>)

return <img width='83vh' className='cardType' src={img}/>


}



const Pokemon = ({ id, name, sprite, types}) => {return(

  <Link key={id} to={`/pokemons/${id}`}>

<div key={`div${id}`} className='card demo mewtwo animated '>
  <p className='cardname'>{name}</p>
  <img src= {sprite} alt= {name + " pokemon"} height="200px"/>
  <div className='typeContainer'>{types.map((type)=><Type key={ generateKey(type) }  name={type.name}/>)}</div>
</div>
</Link>

)}

export default Pokemon
