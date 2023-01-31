import React, {useState,useEffect} from 'react'; 
import { useSelector,useDispatch } from 'react-redux';
import ReadData        from '../readdata';

import './style.css'
import bg from './bg.png';

import { postEdit }     from '../../actions';


function sanitize(string){
  const map={'%0a':'','%0d':'','Content-Type:':'','bcc:':'','to:':'','cc:':'','&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;',"/":'&#x2F;',"\\":'&#x2F;'};
  const reg=/[&<>"'/]/ig;
  return string.replace(reg,(match)=>(map[match]));
}


export default function Create() { 

const dispatch = useDispatch(),
post = useSelector ( ( state ) => state.post ) ,
type   = useSelector ( ( state ) => state.type ) ,
render = {} 
ReadData()
render.selector = 
Object.entries( type )
.map( ( [k, v] ) => {
return (
  <option key={v} value={k}>{v.toUpperCase()}</option>
)
})
function handleSlider(e)
{
  let
  value = e.target.value 
  const
  index = e.target.id,
  idlbl = index+'value',
  id = document.getElementById(idlbl)
  let posteo = {}
      posteo[index]=Number(value)
  dispatch(postEdit(posteo))
  if(id) {
    if ( index === 'height' )
    {
      value = (value < 100 ) ? value + ' cm' : ( value / 100 ).toFixed(2)+' m'
    }
    if ( index === 'weight' )
    {
      value += ' kg'
    }
      id.innerHTML = value
  }
}


function handleSubmit (e)
{
  e.preventDefault()

  if ( post.name === '' || post.sprite === '' ) console.log(post)




  


console.log('click')



}



function handleSelector (e)
{
const   first  = Number ( document.getElementById('first' ).value)
  let   second = Number ( document.getElementById('second').value)
   if ( first === second) {
  document.getElementById('second').value='none'
  second = Number('none')
  }
const out = ( isNaN(second) ) ? [{name : type[first]}] : [{name : type[first]},{name : type[second]}]
let posteo=[]
    posteo['types'] = out
    dispatch(postEdit(posteo))
}

function invalido(e)
{
  let input = e.target, output = {} , id = input.id , 
  re = new RegExp("^"+input.getAttribute("pattern")+"$")
    if ( re.test( input.value ) || input.value === '' ) {
      input.classList.remove('error')
      output[id]= (id === 'name') ? sanitize(input.value) : input.value  // elimino indeseables en nombre  
      dispatch(postEdit(output))
    } else {
      output[id]=''
      dispatch(postEdit(output))
      input.classList.add('error')
    }
}

return (<>

console.log(post.name)

  <div id='createpokemon-body'>
  <img src={bg} alt='pikachu'/>
  <div id='createpokemon'>
  <form name='form' id='form' method='get' action=''>
  <fieldset>
  <div className='row'>
  <div className='column'>
  <h3>POKEMON DESIGNER</h3>
  </div>
  </div>
  <div className='row'>
  <div className='wide_column'>
  <input type='text' id='email' name='name'/>
  <label>Name
  <input type='text' onInput={(e)=>invalido(e)} id='name' name='name' pattern="[a-zA-Z].{3,}" minLength='3' autoFocus required='required' placeholder='name is required (Alpha only) ...'/>
  </label>
  </div>
  <div className='column'>
  <label>1st Type</label>
  <select  defaultValue={'normaldefault'} id='first' name='first' required='required' size='1'  onChange={(e)=>{handleSelector(e)}}>
  {render.selector}
  <option key='normaldefault' value='12' hidden> NORMAL (default)</option>
  </select>
  </div>
  </div>
  <div className='row'>
  <div className='wide_column'>
  <label>Picture URL
  <input type='text' onInput={(e)=>invalido(e)} name='sprite' id='sprite' required='required' placeholder='url is required: http only'
  pattern="[hH][tT][tT][pP][sS]?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*"
/>
  </label>
  </div>
  <div className='column'>
  <label>2nd Type</label>
  <select defaultValue={'nonedefault'}  id='second' name='second' required='required' size='1' onChange={(e)=>{handleSelector(e)}}>
  <option key='nonedefault' hidden value='nonedefault'> NONE (default) </option>
  <option key='none' value='none'> NONE </option>
  {render.selector}
  </select>
  </div>
  </div>
  


  <div className='row'>
<div className='wide_column'>
<label>Attack: <span id='attackvalue'>{post.attack}</span></label>
<input type="range" id="attack" name="attack" min="10" max="100" defaultValue={post.attack} step="10" onChange={(e)=>handleSlider(e)}/>
</div>
<div className='column'>
<label>Hit Points: <span id='hpvalue'>{post.hp}</span></label>
<input type="range" id="hp" name="hp" min="10" max="1000" defaultValue={post.hp} step="11" onChange={(e)=>handleSlider(e)}/>
</div>
</div>
<div className='row'>
<div className='wide_column'>
<label>Defense: <span id='defensevalue'>{post.defense}</span></label>
<input type="range" id="defense" name="defense" min="10" max="100" defaultValue={post.defense} onChange={(e)=>handleSlider(e)} step="10"/>
</div>
<div className='column'>
<label>Height: <span id='heightvalue'>{post.height} cm</span></label>
<input type="range" id="height" name="height" min="1" max="200" defaultValue={post.height} step="1" onChange={(e)=>handleSlider(e)}/>
</div>
</div>
<div className='row'>
<div className='wide_column'>
<label>Speed: <span id='speedvalue'>{post.speed}</span></label>
<input type="range" id="speed" name="speed" min="10" max="100" defaultValue={post.speed} step="10" onChange={(e)=>handleSlider(e)}/>
</div>
<div className='column'>
<label>Weight: <span id='weightvalue'>{post.weight} kg</span></label>
<input type="range" id="weight" name="weight" min="10" max="100" defaultValue={post.weight} step="10" onChange={(e)=>handleSlider(e)}/>
</div>
</div>




  <div id='foot'>
<div id='left'>
<b>AVISO</b>: Todo form que se precie de tal tiene que contener al menos un disclaimer legal de alg&uacute;n tipo. (c) 2022. Luciano Federico Pereira
</div>
<div id='right'>
<button type='submit' onClick={(e)=>handleSubmit(e)}>SEND</button>
</div>
</div>
</fieldset>
</form>
</div>
</div>
</>)}




