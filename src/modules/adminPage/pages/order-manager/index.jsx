import { Table, Button, Space, Tooltip, Spin } from "antd";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { getListStart } from "./redux";
import ModalOrderDetail from "./components/ModalOrderDetail";
import "./styles.scss";

const OrderManager = () => {
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState();
  const [showModal, setShowModal] = useState(false);
  const {
    orderManager: {
      status,
      data: { listOrder },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getListStart());
  }, []);

  const columns = [
    {
      title: "STT",
      render: (record) => (
        <div className="text-center">{listOrder?.indexOf(record) + 1}</div>
      ),
      key: "id",
      width: "5%",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "maDonHang",
      key: "maDonHang",
      align: "center",
      width: 150,
    },
    {
      title: "Người đặt hàng",
      dataIndex: "nguoiDatHang",
      key: "nguoiDatHang",
      align: "center",
      width: 240,
      render: (record) => <div>{record.hoTen}</div>,
    },
    {
      title: "Thời gian đặt",
      dataIndex: "thoiGianDat",
      key: "thoiGianDat",
      align: "center",
      width: 240,
      render: (record) => {
        const date = moment(new Date(record)).format("HH:MM - DD/MM/YYYY");
        return <div>{date}</div>;
      },
    },
    {
      title: "Đơn giá(VNĐ)",
      dataIndex: "tongTien",
      key: "tongTien",
      align: "center",
      width: 200,
      render: (record) => (
        <div>
          {record.toLocaleString("vi", { style: "currency", currency: "VND" })}
        </div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "trangThaiStr",
      key: "trangThaiStr",
      align: "center",
      width: 200,
    },
    {
      title: "Thao tác",
      key: "operation",
      width: 100,
      render: (text, record) => (
        <div className="text-center">
          <Space size="small">
            <Tooltip
              title="Thông tin đơn hàng"
              color="#2a2a2a"
              mouseLeaveDelay={0}
            >
              <Button
                icon={<InfoCircleOutlined />}
                className="btn-small btn-info-icon"
                size="middle"
                onClick={() => {
                  setShowModal(true);
                  setOrderDetail(record);
                }}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div className="container_user-manager">
      <Spin spinning={status === "loading"}>
        <Header />
        <Table
          dataSource={listOrder}
          columns={columns}
          bordered
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
          }}
        />
      </Spin>
      <ModalOrderDetail
        orderDetail={orderDetail}
        visible={showModal}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default OrderManager;
