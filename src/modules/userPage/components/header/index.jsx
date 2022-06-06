import { Space, Avatar, Input, Dropdown, Menu } from 'antd';
import { HomeOutlined, CompassOutlined, PhoneOutlined, TeamOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginStart } from '../../../auth/redux';
import './styles.scss';
import logo from '../../../../assets/img/logo.png';


const Header = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.clear();
        dispatch(loginStart()); 
        window.location.reload();
    }
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <div className="menu-item" target="_blank" rel="noopener noreferrer">
                            Xem thông tin
                        </div>
                    ),
                },
                {
                    label: (
                        <div className="menu-item" target="_blank" rel="noopener noreferrer">
                            Đổi mật khẩu
                        </div>
                    ),
                },
                {
                    label: (
                        <div className="menu-item logout" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={handleLogout}>
                            Đăng xuất
                        </div>
                    ),
                },
            ]}
        />
    );
    const headerList = [
        {
            name: 'Trang chủ',
            path: '/user',
            icon: <HomeOutlined />
        },
        {
            name: 'Khám phá',
            path: '/user/explore',
            icon: <CompassOutlined />
        },
        {
            name: 'Về chúng tôi',
            path: '/user/about-us',
            icon: <TeamOutlined />
        },
        {
            name: 'Liên hệ',
            path: '/user/contact-us',
            icon: <PhoneOutlined />
        },
    ];

    const onSearch = (value) => {
        console.log(value)
    }

    return (
        <div className="wrap-header section section__header">
            <Space>
                {/* <div className="header-logo">
                    <img src={logo} alt="logo" />
                </div> */}
                {
                    headerList.map((item, i) => (
                        <Link to={item.path} key={i}>
                            <div className="header-item" key={i}>{item.icon} {item.name}</div>
                        </Link>
                    ))
                }
            </Space>
            <Space>
                <Input.Search
                    placeholder="Tìm kiếm sản phẩm"
                    style={{ width: 460 }}
                    onSearch={onSearch}
                    enterButton
                    className='search-input'
                />

                <div className="wrap-icon">
                    <ShoppingCartOutlined />
                </div>
                <div className="wrap-avatar">
                    <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                        <Avatar icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </Space>
        </div>
    )
}

export default Header