import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/liverpool.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown_icon.png'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p></p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li><NavLink exact to='/' style={{ color: 'black', textDecoration: 'none' }} activeClassName='active-link'>Home</NavLink></li>
        <li onClick={()=>{setMenu("shop")}}><Link style={{color: 'black', textDecoration: 'none'}} to='/shop'>Cửa Hàng</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{color: 'black', textDecoration: 'none'}} to='/mens'>Nam</Link> {menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{color: 'black', textDecoration: 'none'}} to='/womens'>Nữ</Link> {menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{color: 'black', textDecoration: 'none'}} to='kids'>Trẻ Em</Link> {menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Đăng Xuất</button>
        : <Link to='/login'><button>Đăng nhập</button></Link>}
        <Link to='cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
