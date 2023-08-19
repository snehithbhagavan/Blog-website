import Register from './register';
import Login from './login';
import Add from './Addpost';
import Home from './home';
import Navigation from './navbar';
import Eachpost from './Eachpost';
import EditPost from './edit';
import MyPosts from './myposts';
import './App.css';
import Loggedin from './loggedin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MyEachPost from './myeachpost';
import Profile from './profile';
import Otherprofile from './otherprofile';
import OurStory from './ourstory';
//import Home from './components/Home'

export default function App(){

    return(
        <>
        <div className="main">
            <BrowserRouter>
            <Routes>
                <Route path="/Register" element={<Register />} />
            
             <Route path="/Login" element={<Login/>} /> 
    <Route path="/Add" element={<Add />} />
    <Route path="/" element={<Home />} /> 
    <Route path="/loggedin" element={<Loggedin />} />
    <Route path="/eachpost/:postId" element={<Eachpost />} />
    <Route path='/myposts' element={<MyPosts />} />
    <Route path='/post/:postId/edit' element={<EditPost/>} />
    <Route path='/myeachpost/:postId' element={<MyEachPost/>} />
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/otherprofile/:profileId' element={<Otherprofile/>} />
    <Route path='/ourstory' element={<OurStory/>}/>
    </Routes>
    </BrowserRouter>
        </div>
        </>
    )
}