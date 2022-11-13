import { Button, Avatar, Space, Row, Col } from "antd";
import moment from "moment";
import React from "react";
import Modal from "../../../../../../components/Modal";
import { BASE_URL } from "../../../../../../core/constant";
import "./styles.scss";

const ModalUserDetail = (props) => {
  const info = props.userDetail;
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      width={700}
      title={`Thông tin tài khoản ${info?.username}`}
      footer={
        <div key="footer" className="d-flex justify-content-end">
          <Button
            key="back"
            onClick={props.onCancel}
            className="btn-form-register__cancel"
          >
            Đóng
          </Button>
        </div>
      }
    >
      <div className="container_modal-detail">
        <div className="text-center">
          <Avatar size={64} src={BASE_URL + info?.avatar} />
        </div>
        <Row className="wrap-info">
          <Col span={12}>
            <Space className="info-item">
              <div className="title-left">Tên tài khoản: </div>
              <div className="content-right">{info?.username}</div>
            </Space>
            <Space className="info-item">
              <div className="title-left">Họ tên: </div>
              <div className="content-right">{info?.hoTen}</div>
            </Space>
            <Space className="info-item">
              <div className="title-left">Ngày sinh: </div>
              <div className="content-right">
                {info?.ngaySinh
                  ? moment(info.ngaySinh).format("DD-MM-YYYY")
                  : "Chưa cập nhật"}
              </div>
            </Space>
            <Space className="info-item">
              <div className="title-left">Giới tính: </div>
              <div className="content-right">
                {info?.gioiTinh === 1
                  ? "Nam"
                  : info?.gioiTinh === 2
                  ? "Nữ"
                  : info?.gioiTinh === 3
                  ? "Khác"
                  : "Chưa cập nhật"}
              </div>
            </Space>
          </Col>
          <Col span={11}>
            <Space className="info-item">
              <div className="title-left">Phân quyền: </div>
              <div className="content-right">
                {info?.phanQuyen === "ADMIN" ? "Quản trị viên" : "Người dùng"}
              </div>
            </Space>
            <Space className="info-item">
              <div className="title-left">Email: </div>
              <div className="content-right">{info?.email}</div>
            </Space>
            <Space className="info-item">
              <div className="title-left">SĐT: </div>
              <div className="content-right">
                {info?.sdt || "Chưa cập nhật"}
              </div>
            </Space>
            <Space className="info-item">
              <div className="title-left">Địa chỉ: </div>
              <div className="content-right">
                {info?.diaChi || "Chưa cập nhật"}
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalUserDetail;
