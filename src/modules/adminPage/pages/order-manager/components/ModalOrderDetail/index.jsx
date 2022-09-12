import { Button, Spin, Table } from "antd";
import React, { useState, useEffect } from "react";
import confirm from "antd/lib/modal/confirm";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./styles.scss";
import { getListDetailStart, chuyenTrangThaiStart } from "../../redux";
import Modal from "../../../../../../components/Modal";

const ModalOrderDetail = (props) => {
  const dispatch = useDispatch();
  const { visible, orderDetail, onCancel } = props;
  const {
    orderManager: {
      status,
      data: { listDetail },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    if (orderDetail) dispatch(getListDetailStart(orderDetail?.id));
  }, [orderDetail]);

  console.log("orderDetail", orderDetail);

  const columns = [
    {
      title: "STT",
      render: (record) => (
        <div className="text-center">
          {listDetail?.indexOf(record) + 1 || ""}
        </div>
      ),
      key: "id",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      key: "tenSanPham",
      align: "center",
      width: 200,
      render: (record) => <div>{record?.sanPham?.tenSanPham}</div>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "kichCo",
      key: "kichCo",
      align: "center",
      width: 120,
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
      align: "center",
      width: 200,
      render: (record) => (
        <div>
          {record?.toLocaleString("vi", { style: "currency", currency: "VND" })}
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      width: 120,
    },
    {
      title: "Tổng giá sản phẩm",
      key: "tongGia",
      align: "center",
      width: 240,
      render: (record) => (
        <div>
          {record?.giaBan * record?.soLuong
            ? (record?.giaBan * record?.soLuong).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            : ""}
        </div>
      ),
    },
  ];
  console.log("orderDetail", orderDetail);

  const handleChangeStatus = (status) => {
    const body = {
      id: orderDetail?.id,
      trangThai: status,
    };
    dispatch(chuyenTrangThaiStart({ ...body }));
    onCancel();
  };

  const confirmChangeStatus = () => {
    confirm({
      title: "Hủy đơn hàng",
      // icon: <DeleteOutlined color="red" />,
      width: "600px",
      content: (
        <div>
          Bạn có chắc chắn muốn hủy đơn hàng mã
          <strong> {orderDetail?.maDonHang} </strong>
          không?
        </div>
      ),
      okText: "Đồng ý",
      cancelText: "Đóng",
      onOk() {
        handleChangeStatus(0);
      },
      onCancel() {},
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={
        orderDetail
          ? `Chi tiết đơn hàng mã ${orderDetail?.maDonHang}`
          : "Chi tiết đơn hàng"
      }
      width={900}
      footer={
        <div key="footer" className="d-flex justify-content-end">
          <Button
            key="back"
            onClick={onCancel}
            className="btn-form-register__cancel"
          >
            Đóng
          </Button>
          {orderDetail?.buttonShowList?.map((item, i) => (
            <Button
              key="submit1"
              className="btn-form-register__submit"
              onClick={() => handleChangeStatus(item.trangThai)}
              // disabled={orderDetail?.trangThai === 2}
            >
              {item.text}
            </Button>
          ))}
          {/* <Button
            key="submit2"
            className="btn-form-register__submit"
            onClick={confirmChangeStatus}
            disabled={orderDetail?.trangThai === 0}
          >
            Hủy đơn
          </Button> */}
        </div>
      }
    >
      <Spin spinning={status === "loading"}>
        <div className="wrap-content-order">
          <div className="title text-center">THÔNG TIN ĐƠN HÀNG</div>
          <div className="content-info">
            <div className="info-row">
              <div className="info-item">
                <span className="info-title">Người đặt hàng: </span>
                <span className="info-content">
                  {orderDetail?.nguoiDatHang.hoTen}
                </span>
              </div>
              <div className="info-item">
                <span className="info-title">Thời gian đặt hàng: </span>
                <span className="info-content">
                  {moment(new Date(orderDetail?.thoiGianDat)).format(
                    "DD/MM/YYYY"
                  )}
                </span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="info-title">Người nhận: </span>
                <span className="info-content">
                  {orderDetail?.tenNguoiNhan}
                </span>
              </div>
              <div className="info-item">
                <span className="info-title">Số điện thoại người nhận: </span>
                <span className="info-content">
                  {orderDetail?.sdtNguoiNhan}
                </span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-title">Địa chỉ giao hàng: </span>
              <span className="info-content">
                {orderDetail?.diaChiGiaoHang}
              </span>
            </div>
            <div className="info-item">
              <span className="info-title">Ghi chú: </span>
              <span className="info-content">{orderDetail?.ghiChu}</span>
            </div>
          </div>
          <div className="title">Danh sách sản phẩm: </div>
          <Table
            // dataSource={listDetail}
            columns={columns}
            bordered
            // rowKey="id"
            pagination={false}
            dataSource={listDetail?.concat(
              (() => {
                let tongGia = 0;
                for (let row of listDetail) {
                  tongGia += row["soLuong"] * row["giaBan"];
                }
                return {
                  key: "total",
                  name: "Total (by Column)",
                  giaBan: "Tổng thanh toán: ",
                  soLuong: tongGia.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  }),
                };
              })()
            )}
          />
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalOrderDetail;
