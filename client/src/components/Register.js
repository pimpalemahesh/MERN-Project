import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Register() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    profession:"",
    password:"",
    cpassword:""
  });

  const handleInputs = (e) => {
    let data = e.target.name;
    let datavalue = e.target.value;

    setUser({...user, [data]:datavalue});
  }

  const PostData = async(e) =>{
    e.preventDefault();
    const {name, email, phone, profession, password, cpassword} = user;

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name, email, phone, profession, password, cpassword
      })
    });

    const data = await res.json();
    console.log(data);
    if(data.status === 422 || !data){
      window.alert(data.error);
      console.log("Unsuccessful");
    } else{
      window.alert("Succesfull Registration");
      console.log("Succesfull Registration");
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
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form method='POST'>
                        <div className="form-group">
                          <label htmlFor="name"><i className="zmdi zmdi-account"></i></label>
                          <input type="text" name="name" value={user.name} onChange={handleInputs} className="form-control" id="name" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                          <input type="email" name='email' value={user.email} onChange={handleInputs} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk"></i></label>
                          <input type="number" name='phone' value={user.phone} onChange={handleInputs} className="form-control" id="phone" placeholder="Your Phone" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="profession"><i className="zmdi zmdi-slideshow"></i></label>
                          <input type="text" name='profession' value={user.profession} onChange={handleInputs} className="form-control" id="profession" placeholder="Profession" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                          <input type="password" name='password' value={user.password} onChange={handleInputs} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cpassword"><i className="zmdi zmdi-lock"></i></label>
                          <input type="password" name='cpassword' value={user.cpassword} onChange={handleInputs} className="form-control" id="cpassword" placeholder="Confirm Password" />
                        </div>
                        <br/>
                        <div>
                          <button type="submit" className="btn btn-primary form-submit" onClick={PostData}>Submit</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt='' />

                    </div>
                  </div>
                  <br/>
                  <NavLink to="/login" className="btn text-primary">I have already registered.</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
