import { Spin, Row, Col } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategoryStart } from "../../redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../core/constant";
import "./styles.scss";

const MenuPage = () => {
  const dispatch = useDispatch();
  const {
    status,
    data: { listCategory },
  } = useSelector((state) => state.userPage);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getListCategoryStart());
  }, []);

  return (
    <div className="menu-page-container">
      <Spin spinning={status === "loading"}>
        {listCategory?.map((category, i) => (
          <CategoryItem key={i} category={category} />
        ))}
      </Spin>
    </div>
  );
};

export default MenuPage;

const CategoryItem = (props) => {
  const { category } = props;
  return (
    <div className="category-row">
      <div className="category-title mb-1">{category.tenLoaiSanPham}</div>
      <Row>
        <Col span={15} className="mb-3">
          <Link to={`/menu/${category.id}`}>
            <img src={`${BASE_URL}${category.anh}`} alt="" />
          </Link>
          <div className="category-description">{category.moTa}</div>
          <Link to={`/menu/${category.id}`}>
            <button className="btn-show-product">XEM SẢN PHẨM</button>
          </Link>
        </Col>
        <Col span={8}>
          {category?.sanPham?.map((product, i) => (
            <div className="box-product" key={i}>
              <Link to={`/product/${product.id}`} className="wrap-img">
                <img
                  src={`${BASE_URL}${product.anh}`}
                  alt={product.tenSanPham}
                />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.id}`} className="wrap-img">
                  <div className="product-info_name">{product.tenSanPham}</div>
                </Link>
                <div className="product-info_description">{product.moTa}</div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};
