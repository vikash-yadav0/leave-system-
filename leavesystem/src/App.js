
import { Route, Routes } from 'react-router-dom';
import './App.css';

import HomeLand from './component/home';
import LandingPage from './component/LandingPage';

import Login from './component/Login';


function App() {
  return (
    <div>

<Routes>
<Route path="*" element={<Login/>} exact></Route>
<Route path='/' element={<Login/>}></Route>
<Route path='/login' element={<Login/>}></Route>

<Route path='/home' element={<LandingPage/>}></Route>

</Routes>
    </div>
  );
}

export default App;
