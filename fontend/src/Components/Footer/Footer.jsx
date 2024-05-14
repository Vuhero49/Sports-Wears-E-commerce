import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/liverpool.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>LIVERPOOL</p>
      </div>
      <ul className="footer-links">
        <li>Công Ty</li>
        <li>Sản Phẩm</li>
        <li>Văn Phòng</li>
        <li>Về Chúng Tôi</li>
        <li>Liên Hệ</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icon-container">
            <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icon-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - You Never Walk Alone.</p>
      </div>
    </div>
  )
}

export default Footer
