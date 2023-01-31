import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokeByName } from "../../actions";

export default function Search() {
  const
  dispatch = useDispatch(), 
  name = useSelector((state) => state.pokByName),
  [search, setSearch] = useState(''),
  [isDisabled, setIsDisabled] = useState(true),
  [searchResult, setSearchResult] = useState(''),
  Boton = e => { return (<button type='submit' disabled={isDisabled} onClick={(e) => HandleSubmit(e)}>Go</button>) } ,
  HandleChange = e => {
    const value = e.target.value.toLowerCase(),
    submitable  = ( value.length > 3 ) ? false : true 
    setIsDisabled ( submitable )
    setSearch     ( value )
  },
    HandleSubmit = e => {
    dispatch(getPokeByName(search))
  }

  if ( !isDisabled && name != searchResult ) {

    if ( Array.isArray(name) && name.length > 0 && search === name[0].name )
    {
      setIsDisabled(true)
      setSearch('')
      setSearchResult(name)
      window.location = ('http://localhost:3000/pokemons/'+name[0].id);
    }
    else { // if (name==='not found')

      setIsDisabled(true)
      setSearch('')
      setSearchResult(name)
      window.location = ('http://localhost:3000/notfound')

    }
  }

  function enter(e){
    if (e.code==='Enter' || e.code==='NumpadEnter') {
      HandleSubmit();
    }
  }
 

return (<>
<div id='buscador'>
<input 
id='search'
type='text'
placeholder="Search..."
name="search"
onChange={HandleChange}
value={search}
onKeyUp={(e) => {enter(e)}}
/>
<Boton/></div>
</> ) }

