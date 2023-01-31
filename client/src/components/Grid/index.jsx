import Pokemon  from '../Card';
import React, { Fragment } from 'react';
import './style.css';

export default function Grid({visible}) { 
{ return ( <>
<div className="grid"><Fragment>
{ 
  visible &&
  visible.map((e) => 
  { 
    return ( <Pokemon id={e.id} key={e.name} name={e.name} sprite={e.sprite} types={e.types} /> );
  })}
</Fragment></div>
</> ) }}
