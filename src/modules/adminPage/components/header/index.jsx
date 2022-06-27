import { Space, Avatar, Input, Dropdown, Menu, Badge } from "antd";
import { BellOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart } from "../../../auth/redux";
import ChangePassForm from "../../../auth/ChangePass";
import "./styles.scss";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState();
  const [showModalChangPass, setShowModalChangPass] = useState(false);

  const handleToggleMenu = () => {
    if (props.onClick) props.onClick();
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(loginStart());
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              className="menu-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem thông tin
            </div>
          ),
        },
        {
          label: (
            <div
              className="menu-item"
              target="_blank"
              rel="noopener noreferrer"
              onClick = {() => setShowModalChangPass(true)}
            >
              Đổi mật khẩu
            </div>
          ),
        },
        {
          label: (
            <div
              className="menu-item logout"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLogout}
            >
              <div>Đăng xuất</div>
            </div>
          ),
        },
      ]}
    />
  );

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="wrap-header-admin section section__header">
      <Space>
        <div className="header-item" onClick={handleToggleMenu}>
          <MenuOutlined /> Tiệm cà phê bất ổn
        </div>
      </Space>
      <Space>
        <Input.Search
          placeholder="Tìm kiếm "
          style={{ width: 300 }}
          onSearch={onSearch}
          enterButton
          size="large"
          className="search-input"
        />
        <Badge count={5} overflowCount={99} size="small">
          <div className="wrap-icon">
            <BellOutlined />
          </div>
        </Badge>
        <div className="wrap-icon">
          <SettingOutlined />
        </div>
        <Space>
          <div className="name-account">{user?.hoTen}</div>
          <div className="wrap-avatar">
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Avatar
                size={48}
                src={"https://co-coffeeshop.herokuapp.com" + user?.avatar}
              />
            </Dropdown>
          </div>
        </Space>
      </Space>
      <ChangePassForm
        visible={showModalChangPass}
        onCancel={() => setShowModalChangPass(false)}
      />
    </div>
  );
};

export default Header;
