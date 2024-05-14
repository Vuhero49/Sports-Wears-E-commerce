import React from 'react'
import './NewLetters.css'

const NewLetters = () => {
  return (
    <div className='newsletter'>
      <h1>Nhận Ưu Đãi Độc Quyền</h1>
      <p>Đăng Ký Để Nhận Thông Tin Mới Nhất</p>
      <div>
        <input type="email" placeholder='Email của bạn...' />
        <button>Đăng Ký</button>
      </div>
    </div>
  )
}

export default NewLetters
