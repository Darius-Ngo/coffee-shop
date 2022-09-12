import { Space, Avatar, Input, Dropdown, Menu, Badge, Spin } from "antd";
import {
  HomeOutlined,
  CommentOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartSmall from "../CartSmall";
import { getListCartStart, deleteCartStart } from "../../redux";
import { logoutStart } from "../../../auth/redux";
import ChangePassForm from '../../../auth/ChangePass';
import "./styles.scss";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalChangPass, setShowModalChangPass] = useState(false);
  const {
    status,
    data: { listCart },
  } = useSelector((state) => state.userPage);
  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if (user) {
      dispatch(getListCartStart(user.id));
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutStart());
    navigate("/menu");
    window.location.reload();
  };

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
            >
              <Link to="/list-order">Danh sách đơn hàng</Link>
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
              Đăng xuất
            </div>
          ),
        },
      ]}
    />
  );
  const headerList = [
    {
      name: "Trang chủ",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Thực đơn",
      path: "/menu",
      icon: <ReadOutlined />,
    },
    {
      name: "Tin tức",
      path: "/news",
      icon: <CommentOutlined />,
    },
    {
      name: "Về chúng tôi",
      path: "/about-us",
      icon: <TeamOutlined />,
    },
  ];

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="wrap-header section section__header">
      <Space>
        {headerList.map((item, i) => (
          <Link to={item.path} key={i}>
            <div
              className={`header-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon} {item.name}
            </div>
          </Link>
        ))}
      </Space>
      <Space>
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          style={{ width: 460 }}
          onSearch={onSearch}
          enterButton
          size="large"
          className="search-input"
        />
        {user ? (
          <Badge
            count={listCart?.length}
            overflowCount={99}
            size="middle"
            className="badge-count"
          >
            <Dropdown
              overlay={<CartSmall />}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <div className="wrap-icon">
                <ShoppingCartOutlined />
              </div>
            </Dropdown>
          </Badge>
        ) : (
          ""
        )}
        {user ? (
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
                  src={"http://192.168.43.105:8080" + user?.avatar}
                />
              </Dropdown>
            </div>
          </Space>
        ) : (
          <Link to={"/login"}>
            <div className="header-item login-btn">Đăng Nhập</div>
          </Link>
        )}
      </Space>
      <ChangePassForm visible={showModalChangPass} onCancel={() => setShowModalChangPass(false)}/>
    </div>
  );
};

export default Header;
