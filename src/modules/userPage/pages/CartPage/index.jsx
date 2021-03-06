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
          message.error("Kh??ng c?? s???n ph???m ????? ?????t h??ng.");
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
                <ImLocation2 /> ?????a ch??? nh???n h??ng
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
                  THAY ?????I
                </div>
              </div>
            </div>
          )}
          <div className="cart-header">
            <Row>
              <Col md={9}>
                <div className="header-content">S???n ph???m</div>
              </Col>
              <Col md={3}>
                <div className="header-content">K??ch th?????c</div>
              </Col>
              <Col md={3}>
                <div className="header-content">????n gi??</div>
              </Col>
              <Col md={4}>
                <div className="header-content">S??? l?????ng</div>
              </Col>
              <Col md={3}>
                <div className="header-content">T???ng gi??</div>
              </Col>
              <Col md={2}>
                <div className="header-content">Thao t??c</div>
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
                  description={"Kh??ng c?? s???n ph???m n??o!"}
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
                Ph?? v???n chuy???n h??ng to??n qu???c:{" "}
                <strong>
                  {(30000).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
              </div>
              <div className="btn-detail">T??m hi???u th??m</div>
            </div>
          )}
          <div className="cart-order">
            {info ? (
              <div className="sum-bill">
                <div className="title">
                  T???ng thanh to??n(g???m ph?? v???n chuy???n):{" "}
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
                <div className="title">T???ng s???n ph???m: </div>
                <div className="bill">
                  {sumBill.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            )}
            <div className="btn-buy" onClick={handleSubmit}>
              ?????T MUA NGAY
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
