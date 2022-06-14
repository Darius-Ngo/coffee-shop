import {Spin, Col, Radio, message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProductByIdStart, insertCartStart} from '../../redux';

import './styles.scss';

const ProductPage = () => {
  SwiperCore.use([Autoplay]);
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, data: {listProduct, productDetail}} = useSelector((state) => state.userPage);

  const [sizeSelect, setSizeSelect] = useState(1);
  const [price, setPrice] = useState();

  useEffect(() => {
    window.scrollTo(0,0);
    if(id) {
      dispatch(getProductByIdStart(id));
    }
  },[id]);

  useEffect(() => {
    switch(sizeSelect) {
      case 1:
        return  setPrice(productDetail.giaBanSizeS);
      case 2:
        return  setPrice(productDetail.giaBanSizeM);
      case 3:
        return  setPrice(productDetail.giaBanSizeL);    
      default:
        return  setPrice(productDetail.giaBanSizeS);
    }
  },[sizeSelect, productDetail]);

  const options = [
    { label: 'S', value: 1 },
    { label: 'M', value: 2 },
    { label: 'L', value: 3 },
  ];

  const onSelectSize = (size) => {
    setSizeSelect(size.target.value);
  }

  const handleOrder = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    if(user && productDetail) {
      const body = {
        id: productDetail?.id,
        tenSanPham: productDetail?.tenSanPham,
        anh: productDetail.anh,
        gia: price,
        size: sizeSelect,
      }
      dispatch(insertCartStart(body));
    } else {
      message.info('Vui lòng đăng nhập để thực hiện thao tác này.');
      navigate('/login');
    }
  }

  console.log(JSON.parse(localStorage.getItem('listCart')))

  return (
    <div className="container-product-detail-page">
      <Spin spinning={status === "loading"}>
        <div className="container-product-detail-page_content">
        <Col span={16}>
          <div className="product-detail-title mb-1 ">{productDetail?.tenSanPham}</div>
          <div className="row-content">
            <div className="wrap-img">
            <img src={`https://co-coffeeshop.herokuapp.com${productDetail.anh}`} alt={productDetail.tenSanPham} />
            </div>
            <div className="wrap-content">
              <div className="product-description">{productDetail?.moTa}</div>
              <div className="btn-order" onClick={handleOrder}>
                {/* <img src={btnImg} alt='ĐẶT MUA NGAY'/> */}
                THÊM VÀO GIỎ
              </div>
              <div className="product-option">
                <div className="option-size">
                  <div className="title">Size: </div>
                  <Radio.Group options={options} onChange={onSelectSize} value={sizeSelect} optionType="button" />
                </div>
                <div className="product-price">
                  <span className="title">Giá: </span><strong>{price} VNĐ</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="product-list">
            <Swiper
                  grabCursor={true}
                  spaceBetween={30}
                  modules={[Autoplay]}
                  slidesPerView={4}
                  autoplay={{ delay: 5000 }}
              >
                {listProduct.map((product, i) => (
                    <SwiperSlide key={i}>
                      <ProductCard product={product}></ProductCard>
                    </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </Col>
        </div>
      </Spin>
    </div>
  )
}

export default ProductPage;

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