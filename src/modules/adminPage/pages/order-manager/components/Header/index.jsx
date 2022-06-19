import { Input, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getListStart } from "../../redux";
import React, { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    orderManager: {
      status,
      data: { listOrder, listDetail },
    },
  } = useSelector((state) => state);

  const onSearch = (value) => {
    dispatch(getListStart(value));
  };

  return (
    <div className="header-container mb-1">
      <div className="heading">Quản lí đơn hàng</div>
      <div className="header-content">
        <div className="header-title">
          Danh sách đơn hàng: {listOrder.length}
        </div>
        <Input.Search
          placeholder="Tìm kiếm đơn hàng"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 500 }}
          onSearch={onSearch}
          // enterSearch
          className="mb-1"
        />
        {/* <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={() => setShowModal(true)}>
          Thêm người dùng
        </Button> */}
      </div>
      {/* <ModalAddUser visible={showModal} onCancel={() => setShowModal(false)}/> */}
    </div>
  );
};

export default Header;
