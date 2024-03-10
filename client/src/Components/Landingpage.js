import React from 'react';
import mosaic from '../images/mosaic.png';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';



const Landingpage = () => {
  return (
    <>
    
            <div className='row'>
                <div style={{marginLeft:'20%', marginTop:'30px'}}>
                <h2>Wellcome To the Flashback</h2>
                <p>A Customized app for the people who want tho store there Childhood Photos With A Unique Way </p>
                </div>
            </div>
            <div className='row'>
                <div style={{width:'25%',minHeight:'400px',  marginLeft:'25%'}}>
                <img src={mosaic} />
                </div>

            </div>
            <div className='row'>
                <div className='col-lg-6 mt-3'>
                    <div style={{marginLeft:'50%'}}>
                    <Link to='/register'>
                        <button className='btn btn-sm btn-outline-dark'><h3>Register</h3></button>
                    </Link>
                        
                    </div>
                </div>
                <div className='col-lg-6 mt-3'>
                    <div  style={{marginLeft:'-20%'}}>
                    <Link to='/login'>
                        <button className='btn btn-sm btn-outline-dark'><h3>Login</h3></button>
                    </Link>
                    </div>
                </div>
            </div>
            
    </>
  )
}

export default Landingpage