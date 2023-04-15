import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import List from './Components/List';
import Detail from './Components/Detail';
function App({movie}) {
  
  return (
    <div>
     
      <div className='mt-10'>
        {
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<List movie = {movie}/>}/>
            <Route path={'/watch/:id'} element={<Detail/>}/>
          </Routes>
          </BrowserRouter>
        }
      </div>
      
    </div>
  );
}

export default App;
