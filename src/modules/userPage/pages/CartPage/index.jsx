import { Row, Col, Spin, Form, Empty, message } from "antd";
import { ImLocation2 } from "react-icons/im";
import { FcShipped } from "react-icons/fc";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCartStart, datHangStart } from "../../redux";
import CartItem from "./components/CartItem";
import ModalSelectLocal from "./components/ModalSelectLocal";
import "./styles.scss";
const CartPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [sumBill, setSumBill] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [showModalSelectLocal, setShowModalSelectLocal] = useState(false);

  const {
    status,
    data: { listCart },
  } = useSelector((state) => state.userPage);
  const diaChi = localStorage.getItem("diaChi");
  const info = JSON.parse(localStorage.getItem("info"));
  const User = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if (User) {
      dispatch(getListCartStart(User.id));
    }
  }, []);

  useEffect(() => {
    const listItem = document.querySelectorAll("span.sum-number");
    const newList = [];
    listItem?.forEach((item) => {
      newList.push(item.innerText);
    });
    let sum = newList.reduce((pre, curr) => +(pre + +curr), 0);
    setSumBill(sum);
  }, [changePrice, listCart]);

  const handleSubmit = () => {
    if (!info) {
      setShowModalSelectLocal(true);
    } else {
      form.validateFields().then(() => {
        const value = form.getFieldsValue(true);
        const listProduct = [];
        listCart.map((item, i) => {
          listProduct.push({
            idSanPham: item.sanPham.id,
            kichCo: item.kichCo,
            soLuong: value["soLuong" + i],
          });
        });
        const body = {
          idNguoiDat: User.id,
          tenNguoiNhan: info.tenNguoiNhan,
          diaChiGiaoHang: diaChi,
          sdtNguoiNhan: info.sdtNguoiNhan,
          ghiChu: info.ghiChu,
          thongTinThem: "",
          chiTietDatHangInputList: listProduct,
        };
        if (listCart.length > 0) {
          dispatch(datHangStart({ ...body }));
        } else {
          message.error("Không có sản phẩm để đặt hàng.");
        }
      });
    }
  };

  return (
    <div className="cart-page-container">
      <Spin spinning={status === "loading"}>
        <Row>
          {info && (
            <div className="location-info">
              <div className="location-info__title">
                <ImLocation2 /> Địa chỉ nhận hàng
              </div>
              <div className="location-info__detail">
                <div className="location-info__detail-name">
                  <strong>{info?.tenNguoiNhan}</strong>
                  <strong>{info?.sdtNguoiNhan}</strong>
                </div>
                <div className="location-info__detail-content">
                  {info?.thongTinThem}, {diaChi}
                </div>
                <div
                  className="location-info__detail-change"
                  onClick={() => setShowModalSelectLocal(true)}
                >
                  THAY ĐỔI
                </div>
              </div>
            </div>
          )}
          <div className="cart-header">
            <Row>
              <Col md={9}>
                <div className="header-content">Sản phẩm</div>
              </Col>
              <Col md={3}>
                <div className="header-content">Kích thước</div>
              </Col>
              <Col md={3}>
                <div className="header-content">Đơn giá</div>
              </Col>
              <Col md={4}>
                <div className="header-content">Số lượng</div>
              </Col>
              <Col md={3}>
                <div className="header-content">Tổng giá</div>
              </Col>
              <Col md={2}>
                <div className="header-content">Thao tác</div>
              </Col>
            </Row>
          </div>
          <div className="cart-content">
            <Form form={form}>
              {listCart.length > 0 &&
                listCart.map((item, i) => (
                  <CartItem
                    item={item}
                    key={i}
                    index={i}
                    Change={(value) => setChangePrice(value)}
                  />
                ))}
              {!listCart.length > 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Không có sản phẩm nào!"}
                />
              )}
            </Form>
          </div>
          {info && (
            <div className="shipper-info">
              <div className="shipper-icon">
                <FcShipped />
              </div>
              <div className="shipper-content">
                Phí vận chuyển hàng toàn quốc:{" "}
                <strong>
                  {(30000).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
              </div>
              <div className="btn-detail">Tìm hiểu thêm</div>
            </div>
          )}
          <div className="cart-order">
            {info ? (
              <div className="sum-bill">
                <div className="title">
                  Tổng thanh toán(gồm phí vận chuyển):{" "}
                </div>
                <div className="bill">
                  {(sumBill + 30000).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            ) : (
              <div className="sum-bill">
                <div className="title">Tổng sản phẩm: </div>
                <div className="bill">
                  {sumBill.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            )}
            <div className="btn-buy" onClick={handleSubmit}>
              ĐẶT MUA NGAY
            </div>
          </div>
        </Row>
      </Spin>
      <ModalSelectLocal
        visible={showModalSelectLocal}
        onCancel={() => setShowModalSelectLocal(false)}
      />
    </div>
  );
};

export default CartPage;
