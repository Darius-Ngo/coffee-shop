import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss'

const ProductCard = (props) => {

  const {product} = props;

  return (
    <div className="product-item">
      <div className="wrap-img">
        <Link to={`/product/${product.id}`}>
          <img src={`http://192.168.43.105:8080${product.anh}`} alt={product.tenSanPham} />
        </Link>
      </div>
      <Link to={`/product/${product.id}`}>
      <div className="product-name">{product.tenSanPham}</div>
      </Link>
      <div className="product-price">Giá <span>: {(product.giaBanSizeS)?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span></div>
    </div>
  )
}

export default ProductCard