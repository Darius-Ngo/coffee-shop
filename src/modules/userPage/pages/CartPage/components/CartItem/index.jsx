import { Row, Col, Spin, InputNumber, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const [num, setNum] = useState(1);
  const { item, Change, index } = props;
  const selectNum = (value) => {
    setNum(value);
    Change((index + 1) * value);
  };
  return (
    <div className="product-item">
      <Row>
        <Col md={9}>
          <Link to={"/product/" + item.id}>
            <div className="product-img-name">
              <div className="product-img">
                <img
                  src={"https://co-coffeeshop.herokuapp.com" + item.sanPham.anh}
                  alt={item.sanPham.tenSanPham}
                />
              </div>
              <div className="product-name">{item.sanPham.tenSanPham}</div>
            </div>
          </Link>
        </Col>
        <Col md={3}>
          <div className="product-size product-item__content">
            {item.kichCoStr}
          </div>
        </Col>
        <Col md={3}>
          <div className="product-price product-item__content">
            {item.giaBan}đ
          </div>
        </Col>
        <Col md={4}>
          <div className="product-num product-item__content">
            <InputNumber min={1} value={num} onChange={selectNum} />
          </div>
        </Col>
        <Col md={3}>
          <strong className="sum-price product-item__content">
            <span className="sum-number">{item.giaBan * num} </span>
            {` đ`}
          </strong>
        </Col>
        <Col md={2}>
          <div className="product-delete product-item__content">
            <Tooltip placement="right" title="Xóa sản phẩm" color="#f5222d">
              <MdDeleteOutline />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
