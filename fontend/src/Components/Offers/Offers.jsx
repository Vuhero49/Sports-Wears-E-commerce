import React from 'react'
import './Offer.css'
import exclucive_image from '../Assets/offer.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offer-left">
        <h1>Độc Quyền</h1>
        <h1>Gợi Ý Cho Bạn</h1>
        <p>SẢN PHẨM BÁN CHẠY</p>
        <button>Xem</button>
      </div>
      <div className="offers-right">
        <img src={exclucive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
