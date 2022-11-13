import {
  CommentOutlined,
  HomeOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../core/constant";
import ChangePassForm from "../../../auth/ChangePass";
import { logoutStart } from "../../../auth/redux";
import { getListCartStart } from "../../redux";
import CartSmall from "../CartSmall";
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
              onClick={() => setShowModalChangPass(true)}
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
                <Avatar size={48} src={BASE_URL + user?.avatar} />
              </Dropdown>
            </div>
          </Space>
        ) : (
          <Link to={"/login"}>
            <div className="header-item login-btn">Đăng Nhập</div>
          </Link>
        )}
      </Space>
      <ChangePassForm
        visible={showModalChangPass}
        onCancel={() => setShowModalChangPass(false)}
      />
    </div>
  );
};

export default Header;
