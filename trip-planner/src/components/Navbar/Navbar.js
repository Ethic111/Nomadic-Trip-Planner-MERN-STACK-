import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'


function Navbar() {

  
  const [state, setState] = useState(false)
  const [barclass, setBarClass] = useState('fas fa-bars fa-lg')
  const [ulclass, setUlClass] = useState('nav_list')

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()

    } catch (error) {
      console.log(error)
    }

  }

  function handleBar() {
    if (state === false) {
      setState(true)
      setBarClass('fas fa-times fa-lg')
      setUlClass('nav_list active')
      
    }
    else {
      setState(false)
      setBarClass('fas fa-bars fa-lg')
      setUlClass('nav_list')
    }


  }

  function handleLogo() {
    if (state === true) {
      setState(false)
      setBarClass('fas fa-bars fa-lg')
      setUlClass('nav_list')
    }

  }



  return (
    <div className='main_nav_container'>
      <nav className='navbar_container'>

        <div className="main_logo">
          <Link to="/" onClick={handleLogo}><img src="https://i.ibb.co/QKkrvRx/Main-logo.png" alt="Trip Planner Logo" width="125px" height="55px" /></Link>
        </div>

        <div>
          <ul className={ulclass}>

            <span className='li_img'  ><div  className='img_adjust'>
              <img src="https://i.ibb.co/xfdXw3j/tour-guide.png" alt="tours" width="45px" height="45px" /></div> <li className='navbar_item'><Link to="/tours" onClick={handleBar}>Tours</Link></li></span>

            <span className='li_img' ><div className='img_adjust'>
              <img src="https://i.ibb.co/pdB5Hdb/recreational-vehicle.png" alt="tours" width="50px" height="55px" /></div><li className='navbar_item'><Link to="/stories" onClick={handleBar} >Stories</Link></li></span>

            <span className='li_img' ><div className='img_adjust'><img src="https://i.ibb.co/g686gS9/planner.png" alt="Planner" width="40px" height="40px" /></div><li className='navbar_item'><Link to="/form" onClick={handleBar} >Planner</Link></li></span>

            <span className='li_img' ><div className='img_adjust'><img src="https://i.ibb.co/2NzRRkN/blogging.png" alt="Planner" width="40px" height="40px" /></div><li className='navbar_item'><Link to="/blogs/Ahmedabad" onClick={handleBar} >Blogs</Link></li></span>
         
          </ul>
        </div>
        <div className='user_icons'>
          <div className='user_icons_details'>
          {
              user?.email ?
                <span className='user_email'>{user.email}</span> :
                <Link to='/login'><button className='sign_in_button'>Sign in</button></Link>
            }
            {user?.email && <button onClick={handleSignOut} className='sign_in_button'>Logout</button>}

          </div>

          {/* <div>
            <img src="https://i.ibb.co/PzYs4mp/user.png" alt="User_icon"
              width="32px" height="32px" />
          </div> */}


        </div>
       
        <div className='mobile_view_nav'>
          <i id="bar" className={barclass} onClick={handleBar}>

          </i>
          {/* <i className='fas fa-bars'></i>
            <i className='fas fa-times'></i> */}
        </div>


      </nav>

    </div>
  )
}

export default Navbar
