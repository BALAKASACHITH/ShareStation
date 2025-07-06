import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import About from './Pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
export default function Body(){
    return(
        <div className="Body">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/About' element={<About/>}/>
                <Route path='/Signin' element={<Signin/>}/>
                <Route path='/Signup/*' element={<Signup/>}/>
            </Routes>
        </div>
    )
}