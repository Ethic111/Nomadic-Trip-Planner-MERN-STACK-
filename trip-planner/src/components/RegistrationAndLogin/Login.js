import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { Link } from 'react-router-dom'
import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import './Login.css'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [privacyimg, setPrivacyImg] = useState("https://i.ibb.co/r2nvB7s/hideicon.png");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
      alert(e.message)
    }

  };

  

  const handlePrivacyChange = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      setPrivacyImg("https://i.ibb.co/CMNmH6f/showicon.png");
    }
    else {
      x.type = "password";
      setPrivacyImg("https://i.ibb.co/r2nvB7s/hideicon.png");
    }
  }




  // For Google Auth

  const { googleSignIn, user, login } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {

    try {
      await googleSignIn()

    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    if (user != null) {
      navigate('/')
    }
  }, [user, navigate]) // On user change this effect will run




  return (<>
    <div className='login_main_container'>
      <div className='login_sub_container'>
        <h1 className='login_heading'>Login</h1>

        <form className='login_form' onSubmit={handleSubmit}>
          <div>
            <p><span style={{ color: "red" }}><strong>*</strong></span> Indicates a required field</p>

            {/* Email Div */}
            <div className='form_element'>
              <p>Email Id <span style={{ color: "red" }}>*</span></p>
              <input type="email" name='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} required />
            </div>


            {/* Password Div */}
            <div className='form_element'>
              <p>Password <span style={{ color: "red" }}>*</span></p>

              <div className='form_element_input'>

                <input type="password" name='pass' value={password} id="password" onChange={(e) => {
                  setPassword(e.target.value);
                }} required />

                <div >
                  <img src={privacyimg} id='showicon' onClick={handlePrivacyChange} />

                </div>

              </div>

            </div>


            {/* Forgot Password Div */}
            <div className='form_element'>
              <Link to="/pwreset"><strong>Forgot password?</strong></Link>
            </div>

            {/* Login Button */}
            <div className='login_button'>
              <button type="submit">Login</button>
            </div>

            {/* Login With Google */}
            <div className='additional_login_button'>
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>

            <div className='create_account'>
              <Link to="/signup"><strong>Create an account</strong></Link>
            </div>



          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default Login
