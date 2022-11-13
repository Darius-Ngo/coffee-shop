import { Tooltip, Empty, Spin } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartStart } from "../../redux";
import { BASE_URL } from "../../../../core/constant";
import "./styles.scss";

const CartSmall = () => {
  const dispatch = useDispatch();
  const {
    status,
    data: { listCart },
  } = useSelector((state) => state.userPage);
  const User = JSON.parse(localStorage.getItem("User"));

  const handleDelete = (id) => {
    dispatch(deleteCartStart(id));
  };

  return (
    <div className="cart-wrap">
      <Spin spinning={status === "loading"}>
        <div className="cart-title">Danh sách sản phẩm</div>
        <div className="cart-content">
          {listCart &&
            listCart?.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-item__img">
                  <img
                    src={BASE_URL + item?.sanPham.anh}
                    alt={item.sanPham.tenSanPham}
                  />
                </div>
                <div className="cart-item__content">
                  {item?.sanPham?.tenSanPham}
                </div>
                <div className="cart-item__price">
                  {(item?.giaBan).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <Tooltip placement="right" title="Xóa sản phẩm" color="#f5222d">
                  <div
                    className="cart-item__delete"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <MdDeleteOutline />
                  </div>
                </Tooltip>
              </div>
            ))}
          {!listCart.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Giỏ trống!"}
            />
          )}
        </div>
        <div className="btn-order">
          <Link to={"/cart"}>
            <button>Đặt hàng ngay</button>
          </Link>
        </div>
      </Spin>
    </div>
  );
};

export default CartSmall;
