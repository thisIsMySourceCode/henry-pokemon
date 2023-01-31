import './style.css';
import logo from './logo.png'
import up   from './UP.png'
import dw   from './DW.png'
import az   from './AZ.png'
import za   from './ZA.png'
import xx   from './XX.png'
import cc   from './CC.png'

import React, { useState }          from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link }                     from 'react-router-dom';
import { filterType, setOrder }     from '../../actions';

import ReadData             from '../readdata';
import Pager                from '../Pager';
import Grid                 from '../Grid';
import Search               from '../Search';

export default function Home() {

ReadData();


const 

[ filteredBy  , setFilteredBy  ] = useState( 'all'  ) ,  // eslint-disable-line no-unused-vars
[ orderedBy   , setOrderedBy   ] = useState( 'none' ) ,

pageStep   = 12 ,     // Cantidad de Pokemones por página
changeUrl  = false , // Cuando changeUrl = TRUE guardo la parte posterior a # de la url para recargar página actual no requiere useParams
filtrosNav = {
  none       : xx ,
  nameAsc    : az ,
  nameDesc   : za ,
  attackAsc  : up ,
  attackDesc : dw ,
},

url       = window.location.href.split('#') ,
page      = ( changeUrl === true && url.length === 2 && !isNaN( url[1] ) && orderedBy === 'none' ) ? url[1] : 1 ,
[ currentPage , setCurrentPage ] = useState(page) , // 1 para siempre resetear


// data   = useSelector ( ( state ) => state.data   ) ,
// load   = useSelector ( ( state ) => state.load   ) ,
// order  = useSelector ( ( state ) => state.order  ) ,

type   = useSelector ( ( state ) => state.type   ) ,
filter = useSelector ( ( state ) => state.filter ) ,

dispatch = useDispatch() ,

render = {}
  render.grid = ( data, page=12) => {
  const 
  last  = currentPage * page , 
  first = last - page;
  return data.slice ( first, last )
};render.pager = (page,e=0) => { 
  setCurrentPage(page) 
  if (e !== 0 && changeUrl === false ) { 
      e.preventDefault()
  }
};render.orderClick = e => {
  e.preventDefault()
  const value = e.target.id;
  if (orderedBy !== value)
  {
    setCurrentPage(1)
    dispatch(setOrder(value))
    setOrderedBy(value)
  }
};

render.navOrder = 
Object.entries( filtrosNav ).map( ( [k, v] ) => {
  return (
    <img className='orderButton' src={v} key={k} width='52px' onClick={render.orderClick} id={k}/>
  )
});

render.selector = 
Object.entries( type ).map( ( [k, v] ) => {
  return (
    <option key={v} value={v}>{v.toUpperCase()}</option>
  )
});render.pickSelector = e => {
  setFilteredBy(e.target.value)
  setCurrentPage(1)
  dispatch(filterType(e.target.value))
};render.noresults = (filter.length===0) 
  ? 'no hay'
  : ''

return (<>
<div className="page">
  <div className="home">
    <Link to="/">
      <h1 className="app"><img className='logo' src={logo} alt='pokemon'/></h1>
    </Link>
    <div className='navOrder'>{render.navOrder}</div>
    <select id='pokeselector' name='Tipos de Pokemon' onChange={render.pickSelector}>
        <option key='all' value='all'>ALL</option>
        {render.selector}
    </select>
    <Search/>
    <Link to="/Create">
      <img id='create' src={cc}/>
    </Link>
    <Pager
        pageSize={filter.length}
        pageFunction={render.pager}
        pageCurrent={currentPage}
        pageStep={pageStep}
    />   
    {render.noresults}
    <Grid visible={render.grid(filter,pageStep)}/>
  </div>
</div>
</>)
}
