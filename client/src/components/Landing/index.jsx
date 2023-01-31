import Preload from '../preload'
import {Link} from 'react-router-dom'; 
export default function Landing(){
Preload();
return (
      <div className='Landing'>
        <div className='saludo'>
          <h1>Bienvenidos!</h1>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <button className='boton'>Ingresar</button>
          </Link></div>
      </div>      
    )
}

