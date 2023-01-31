import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home     from './components/Home';
import Landing  from './components/Landing';
import Create   from './components/Create';
import Detail   from './components/Detail';
import NotFound from './components/NotFound';


function App() {
return (           
<Router>
<div className='App'>
  <Routes>
      <Route  exact path = '/'             element = { <Landing/>  } />
      <Route  exact path = '/pokemons/:id' element = { <Detail/>   } />
      <Route        path = '/home'         element = { <Home/>     } />
      <Route        path = '/create'       element = { <Create/>   } />
      <Route  exact path = '/notfound'     element = { <NotFound/> } />
  </Routes>
</div>
</Router>   
)
}
export default App;
