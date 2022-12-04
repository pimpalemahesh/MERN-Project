import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let data = e.target.name;
    let datavalue = e.target.value;

    setUser({ ...user, [data]: datavalue });
  }

  const PostData = async(e) =>{
    e.preventDefault();
    const {email, password} = user;

    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();
    if(data.status === 422 || !data){
      window.alert(data.error);
      console.log("Unsuccessful");
    } else{
      window.alert(data.message);
      console.log(data.message);
      navigate('/');
    }
  }


  return (
    <>
      <section>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt='' />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                      <form method='POST'>
                        <div className="form-group">
                          <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                          <input type="email" name='email' value={user.email} onChange={handleInputs} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                          <input type="password" name='password' value={user.password} onChange={handleInputs} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <br />
                        <div>
                          <button type="submit" className="form-submit btn btn-primary" onClick={PostData}>Submit</button>
                        </div>
                      </form>
                    </div>

                  </div>
                  <br />
                  <NavLink to="/signup" className="btn text-primary">Create an account.</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
