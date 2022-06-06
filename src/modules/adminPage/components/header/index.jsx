import { Space, Avatar, Input, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart } from '../../../auth/redux';
import './styles.scss';

const Header = (props) => {
    const dispatch = useDispatch();

    const handleToggleMenu = () => {
        if (props.onClick) props.onClick();
    }

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
                        <div className="menu-item logout" target="_blank" rel="noopener noreferrer"
                            onClick={handleLogout}>
                            <div>
                                Đăng xuất
                            </div>
                        </div>
                    ),
                },
            ]}
        />
    );

    const onSearch = (value) => {
        console.log(value)
    }

    return (
        <div className="wrap-header-admin section section__header">
            <Space>
                <div className="header-item" onClick={handleToggleMenu}><MenuOutlined /> Tiệm cà phê bất ổn</div>
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
                    <BellOutlined />
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