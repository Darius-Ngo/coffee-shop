import { Input, Space, Button } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {getListStart} from '../../redux';
import ModalAddCategory from '../ModalAddCategory'
import './styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const {
    categoryManager: { status ,data: {listCategory}}
  } = useSelector((state) => state);

  const [showModal, setShowModal] = useState(false);

  const onSearch = (value) => {
    dispatch(getListStart(value));
  }

  return (
    <div className="header-container mb-1">
      <Input.Search
      placeholder="Tìm kiếm theo tên danh mục"
      allowClear
      enterButton="Tìm kiếm"
      size="large"
      style={{width: 500}}
      onSearch={onSearch}
      // enterSearch
      className=" mb-1"
    />
      <div className="header-content">
        <div className="header-title">Danh sách danh mục sản phẩm: {listCategory.length}</div>
        <Button 
        type="primary" 
        shape="round" 
        icon={<FolderAddOutlined />} 
        size="large" 
        onClick={() => setShowModal(true)}
        >
          Thêm danh mục
        </Button>
      </div>
      <ModalAddCategory visible={showModal} onCancel={() => setShowModal(false)}/>
    </div>
  )
}

export default Header