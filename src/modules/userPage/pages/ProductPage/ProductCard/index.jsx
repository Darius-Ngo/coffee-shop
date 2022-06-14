import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss'

const ProductCard = (props) => {

  const {product} = props;

  return (
    <div className="product-item">
      <div className="wrap-img">
        <Link to={`/product/${product.id}`}>
          <img src={`https://co-coffeeshop.herokuapp.com${product.anh}`} alt={product.tenSanPham} />
        </Link>
      </div>
      <Link to={`/product/${product.id}`}>
      <div className="product-name">{product.tenSanPham}</div>
      </Link>
      <div className="product-price">Giá <span>: {product.giaBanSizeS} VNĐ</span></div>
    </div>
  )
}

export default ProductCard