import { Route, Routes, Navigate,  BrowserRouter as Router} from 'react-router-dom';
import Main from './components/Main/index'
import Signup from './components/Signup/index';
import Login from './components/Login/index';
import Reset from './components/Reset/index'
import ResetPosta from './components/ResetPosta/index';


function App() {
 
const user = localStorage.getItem('token')
const register = localStorage.getItem('tokenRegister')
  return (
   <Router>
   <Routes>
    {user && <Route path = '/' exact element={<Main/>}></Route>}
    <Route path='/signup' exact element={<Signup/>}></Route>
    <Route path='/login' exact element={<Login/>}></Route>
    <Route path='/forgot' exact element={<Reset/>}></Route>
  {register && <Route path = '/reset/:token' exact element={<ResetPosta/>}></Route>}
    <Route path='/' exact element={<Navigate replace to ='/login'/>}></Route>
   </Routes>
   </Router>
  )
}

export default App
