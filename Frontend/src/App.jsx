//CSS
import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//Components
import Hero from './components/Hero'
import Iphones from './pages/Iphones';
import FourO4 from './pages/FourO4';
import {Routes, Route} from 'react-router-dom'
import Youtube from './components/Youtube/Youtube';
import RateUS from './components/State/RateUS';
import Single from './pages/Single';
import Container from './components/Container';

function App() {
  return (
    <>
    <Routes>
          <Route element={<Container />}>
                <Route path='/' element={<Hero />} />
                <Route path='/iphones' element={<Iphones/> }/>
                <Route path='/iphones/:id' element={<Single/> }/>
                <Route path='/latest_videos' element={<Youtube/> }/>
                <Route path='/rate_us' element={<RateUS/> }/>
                <Route path='/:x' element={<FourO4 />}/>
                <Route path='*' element={<FourO4/> }/>
          </Route>
    </Routes>
        

    </>
  )
}

export default App
