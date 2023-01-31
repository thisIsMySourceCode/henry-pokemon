import './style.css'
export default function Paginado ({pageSize,pageFunction,pageCurrent,pageStep=12}) {
pageSize=Math.ceil(pageSize / pageStep);
if ( pageSize > 0 && pageCurrent > pageSize ) { window.location='http://localhost:3000' } // en caso de reload o si current page es out of range regreso a la intro
if ( pageSize < 2 ) return ''; // si aun no se cargaron los datos o no llega a 2 paginas regreso vacio

let pageNumber = []
    for(let i = 0;  i < pageSize; i++){
        pageNumber.push(i +1)
    }
    return (
        <><nav><ul>
            {pageNumber && pageNumber.map( (number) => (
                <li key={number} className= { (number===pageCurrent) ? 'selected': ''}>
                    <a href={'#'+number}  onClick={(e)=> pageFunction(number,e)}>
                        {number}
                    </a>
                </li>
            ))}
        </ul></nav></>
    );
}
