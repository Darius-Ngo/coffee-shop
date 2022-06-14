import { Input, Space, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getListStart} from '../../redux';
import React, { useState} from 'react';
import ModalAddUser from '../ModalAddUser';
import './styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    userManager: { status ,data: {listUser}}
  } = useSelector((state) => state);

  const onSearch = (value) => {
    dispatch(getListStart(value));
  }

  return (
    <div className="header-container mb-1">
      <Input.Search
      placeholder="Tìm kiếm theo tên người dùng"
      allowClear
      enterButton="Tìm kiếm"
      size="large"
      style={{width: 500}}
      onSearch={onSearch}
      // enterSearch
      className=" mb-1"
    />
      <div className="header-content">
        <div className="header-title">Danh sách người dùng: {listUser.length}</div>
        <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={() => setShowModal(true)}>
          Thêm người dùng
        </Button>
      </div>
      <ModalAddUser visible={showModal} onCancel={() => setShowModal(false)}/>
    </div>
  )
}

export default Header