import { Space, Avatar, Input, Dropdown, Menu, Badge, Segmented } from 'antd';
import { HomeOutlined, PhoneOutlined, TeamOutlined, ShoppingCartOutlined, ReadOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../cart';
import { loginStart } from '../../../auth/redux';
import './styles.scss';


const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const handleLogout = () => {
        localStorage.clear();
        dispatch(loginStart()); 
        window.location.reload();
    }
    useEffect(() => {
        const user = localStorage.getItem('User');
        setUser(JSON.parse(user));
    },[])
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
            path: '/',
            icon: <HomeOutlined />
        },
        {
            name: 'Thực đơn',
            path: '/menu',
            icon: <ReadOutlined />
        },
        {
            name: 'Về chúng tôi',
            path: '/about-us',
            icon: <TeamOutlined />
        },
        {
            name: 'Liên hệ',
            path: '/contact-us',
            icon: <PhoneOutlined />
        },
    ];

    const onSearch = (value) => {
        console.log(value)
    }

    const cartList = JSON.parse(localStorage.getItem('listCart'));

    return (
        <div className="wrap-header section section__header">
            <Space>
                {
                    headerList.map((item, i) => (
                      <Link to={item.path} key={i}>
                        <div className={`header-item ${location.pathname === item.path ? 'active' : ''}`}>{item.icon} {item.name}</div>
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
                    size='large'
                    className='search-input'
                />
                {user ? (
                <Badge count={cartList?.length} overflowCount={99} size="middle" className="badge-count">
                  <Dropdown overlay={Cart} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <div className="wrap-icon">
                      <ShoppingCartOutlined />
                    </div>
                  </Dropdown>
                </Badge>
                ) : ''}
                {
                    user ? (
                      <Space>
                          <div className="name-account">{user?.hoTen}</div>                
                          <div className="wrap-avatar">
                              <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                                  <Avatar size={48} src={'https://co-coffeeshop.herokuapp.com'+user?.avatar} />
                              </Dropdown>
                          </div>
                      </Space>
                    ) : (
                      <Link to={'/login'}>
                        <div className="header-item login-btn">Đăng Nhập</div>
                      </Link>
                    )
                }
            </Space>
        </div>
    )
}

export default Header