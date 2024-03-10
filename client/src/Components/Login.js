import React from 'react'

const Login = () => {

  const loginwithgoogle = () =>{
    window.open("http://localhost:3002/auth/google","_self");
  }

  return (
    <div className="container mt-5 ">
      <h1>Login</h1>
      <div className="row mt-5">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form action="/login" method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control mt-4 mb-3" name="emailid" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input    type="password"    className="form-control mt-4 mb-4"   name="password" />
                </div>
                <div>

                </div>
                <div style={{paddingLeft:'40%'}}>
                    <button type="submit" className="btn btn-dark" >  Login </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <a  className="btn btn-block btn-social btn-google"   onClick={loginwithgoogle}   role="button"  >
                <i className="fab fa-google" />
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login