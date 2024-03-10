import React from 'react';
import '../style/bootstrap-social.css'

const Register = () => {

  const registerwithgoogle =  () =>{
    window.open('http://localhost:3002/auth/google','_self');
  }

  return (
    <div className="container mt-5" >
      <h1>Register</h1>
      <div className="row mt-5">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form action="/register" method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control mt-4 mb-3" name="emailid"  placeholder='Enter Email Address'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Full Name</label>
                    <input type='text' className='form-control mt-4 mb-3' name='fullname' placeholder='Enter Your Name'/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input  type="password"  className="form-control mt-4 mb-3"  name="password"  placeholder='Enter Password'  />
                </div>
                <div style={{paddingLeft:'40%'}}>
                  <button type="submit" className="btn btn-dark">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4">          
            <div className="card social-block">
              <div className="card-body">
                <button className="btn btn-block  btn-social btn-google"  onClick={registerwithgoogle}>
                  <i className="fab fa-google" />
                  Sign Up with Google
                </button>
                
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register