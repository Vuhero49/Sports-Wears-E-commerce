import React , { useContext, useState } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItem = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, addToCart } = useContext(ShopContext);
    const [showNotification, setShowNotification] = useState(false);
    
    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <div className='cartitems'>
            {showNotification && <div className="notification">Sản phẩm đã được xóa khỏi giỏ hàng</div>}
            <div className="cartitems-format-main">
                <p>Sản Phẩm</p>
                <p>Tiêu đề</p>
                <p>Giá</p>
                <p>Số Lượng</p>
                <p>Tổng Tiền</p>
                <p>Xóa sản phẩm</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className="cartitems-quantity">
                                    <button onClick={() => removeFromCart(e.id)}>-</button>
                                    <p>{cartItems[e.id]}</p>
                                    <button onClick={() => addToCart(e.id)}>+</button>
                                </div>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => handleRemoveFromCart(e.id)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Tổng Sảm Phẩm</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Tổng Tiền Hàng</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí Vận Chuyển</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng Thanh Toán</h3>
                            <p>${getTotalCartAmount()}</p>
                        </div>               
                    </div>
                    <button>Thanh Toán</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Mã Giảm Giá</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Mã Giảm Giá...' />
                        <button>Áp Dụng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
