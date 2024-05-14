import React from 'react'
import './Hero.css'
import hero from '../Assets/heroo.png'
import hand_icon from '../Assets/hand_icon_50.png'
import arrow_icon from '../Assets/arrow.png'


const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>SẢN PHẨM CÓ HẠN</h2>
        <div>
            <div className="hand-hand-icon">
                <p>Mới
                <img src={hand_icon} alt=''></img>
                </p>
            </div>
            <p>Bộ sưu tập</p>
            <p>Cho mọi người</p>
        </div>
        <div className="hero-latest-btn">
            <div>Sản phẩm mới nhất</div>
            <img src={arrow_icon} alt=''></img>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero} alt="" />
      </div>
    </div>
  )
}

export default Hero
