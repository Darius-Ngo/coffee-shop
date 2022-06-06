import React from 'react'
import { Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import {
    UserOutlined,
    FileDoneOutlined,
    CarryOutOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';

import './styles.scss';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Quản lý người dùng', '/user-manager', <UserOutlined />),
    getItem('Quản lý danh mục', '/category-manager', <UnorderedListOutlined />),
    getItem('Quản lý sản phẩm', '/product-manager', <CarryOutOutlined />),
    getItem('Quản lý đơn hàng', '/order-manager', <FileDoneOutlined />),
];
const SideBar = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(e.key);
        setCollapsed(true);
    };
    return (
        <div className="wrap-sideBar">
            <Header onClick={() => {
                setCollapsed(!collapsed);
            }} />
            <Menu
                onClick={handleClick}
                theme='light '
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                className='sidebar-menu'
            />
        </div>
    );
};

export default SideBar;