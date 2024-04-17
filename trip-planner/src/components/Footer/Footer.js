import React from 'react'
import {Link} from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <div>
      <footer>
        <div className='footer_info'>

              <div className='footer_logo'>
                <img src="https://i.ibb.co/6vB9Nhj/Untitled-design-1.png" alt=""  width="140px" />
              </div>
              <div>
                <ul className='footer_list'>
                  <li className='footer_item'><Link to="/tours">Tours</Link></li>
                  <li className='footer_item'><Link to="stories">Stories</Link></li>
                  <li className='footer_item'><Link>Contact Us</Link></li>
                  <li className='footer_item'><Link>Privacy Policy</Link></li>

                </ul>
              </div>
        </div>


        <div className="footer_gallery">

                  <img src="https://i.ibb.co/0rSQdsh/Gallery-2.jpg" alt="" width="440px"/>
            <div className='footer_gallery_images'>
                  <img src="https://i.ibb.co/Z1Dsxfv/Gallery-3.jpg" alt="" width="250px"/>
                  <img src="https://i.ibb.co/CsWTK39/Gallery-1.jpg" alt="" width="150px" />
            </div>
        </div>
      </footer>
      
    </div>
  )
}

export default Footer
