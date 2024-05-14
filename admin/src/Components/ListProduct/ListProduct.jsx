import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=> res.json())
    .then((data) =>{setAllProducts(data)});
  }

  useEffect(() =>{
    fetchInfo();
  },[])

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: "POST",
      headers:{
        Accept: 'application/json',
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>Tất cả sản phẩm</h1>
      <div className="listproduct-format-main">
        <p>Sản Phẩm</p>
        <p>Tiêu Đề</p>
        <p>Giá Cũ</p>
        <p>Giá Mới</p>
        <p>Loại Sản Phẩm</p>
        <p>Xóa</p>
      </div>
      <div className="listproduct-all-product">
        <hr/>
        {allproducts.map((product, index) =>{
          return <> <div key={index} className="listproduct-format-main listproduct-format">
            <img className='listproduct-product-icon' src={product.image} alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-remove-icon" />
          </div>
          <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
