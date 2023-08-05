import Register from './register';
import Login from './login';
import Display from './display';
import Add from './Addpost';
import Home from './home';
import Delete from './delete';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import Home from './components/Home'

export default function App(){

    return(
        <>
        <div className="main">
            <BrowserRouter>
            <Routes>
                <Route path="/Register" element={<Register />} />
            
             <Route path="/Login" element={<Login/>} /> 
    <Route path="/Display" element={<Display />} />
    <Route path="/Add" element={<Add />} />
    <Route path="/" element={<Home />} />
    <Route path="/Delete" element={<Delete />} />
    </Routes>
    </BrowserRouter>
        </div>
        </>
    )
}