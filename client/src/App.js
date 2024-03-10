import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home/Home';
import axios from 'axios';
import Post from './Components/CreatePost/Post';




function App() {

  const [userdata, setUserdata] = useState({});

  const getUser = async () =>{
    try {
      const response = await axios.get("http://localhost:3002/login/success", {withCredentials: true});
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout =  () => {
    window.open('http://localhost:3002/logout', '_self')
  };

  useEffect(() => {
    getUser();
  },[]);

  return (
    <>
      <Router>
        <nav>
          
          <div style={{textAlign:'center', border:'1px solid black',height:'60px', backgroundColor:'black'}}>
            
            <ul style={{listStyleType:'none',marginTop:'10px' }}>
              
              {
                Object.keys(userdata).length > 0 ? (
                  <>
                    <li style={{display:'inline', float:'left'}}><h3 style={{color:'white'}}>FlashBaack</h3></li>
                    <li style={{display:'inline',marginLeft:'53%'}}><Link to='/home'><a className='btn text-light'>Home</a></Link></li>
                    <li style={{display:'inline',marginLeft:'2%'}}><Link to='/create-post'><a className='btn text-light'>Post</a></Link></li>
                    <li style={{display:'inline',marginLeft:'2%', position:'relative'}}><img src={userdata.profile_image} alt='profile' width={40} height={40} style={{border: '1px solid white',borderRadius:'50%'}}/></li>
                    <li style={{display:'inline',marginLeft:'2%', color:'white'}}>{userdata.name}</li>
                    <li style={{display:'inline',marginLeft:'2%'}}><button className='btn btn-outline-danger' style={{borderRadius:'10%'}} onClick={logout}>Logout</button></li>
                  </>
                ): <li style={{display:'inline'}}><h3 style={{color:'white'}}>FlashBaack</h3></li>
              }
              
            </ul>
          </div>
        </nav>
        <Routes>
          <Route exact path='/' element={Object.keys(userdata).length > 0 ?  <Navigate to="/home"/> :  <Landingpage/>}></Route>
          <Route exact path='/register' element={Object.keys(userdata).length > 0 ? <Navigate to="/home"/> : <Register/>}></Route>
          <Route exact path='/login' element={Object.keys(userdata).length > 0 ? <Navigate to="/home"/> : <Login/>}></Route>
          <Route exact path='/home' element={Object.keys(userdata).length > 0 ? <Home/> : <Navigate to="/login"/> }></Route>
          <Route exact path='/create-post' element={Object.keys(userdata).length > 0 ? <Post/> : <Navigate to="/login"/>}></Route>
        </Routes>
      </Router>
      <footer>
        <div style={{textAlign:'center', border:'1px solid grey', backgroundColor:'whitesmoke' ,marginTop:'20px'}}>
          <h6>Build with Tanmoy das</h6>
        </div>
      </footer>
    </>
  );
}

export default App;
