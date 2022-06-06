import { Input, Space, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {getListStart} from '../../redux';
import ModalAddProduct from '../ModalAddProduct'
import './styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const {
    productManager: { status ,data: {listProduct}}
  } = useSelector((state) => state);

  const [showModal, setShowModal] = useState(false);

  const onSearch = (value) => {
    dispatch(getListStart(value));
  }

  return (
    <div className="header-container mb-1">
      <Input.Search
      placeholder="Tìm kiếm theo tên sản phẩm"
      allowClear
      enterButton="Tìm kiếm"
      size="middle"
      style={{width: 500}}
      onSearch={onSearch}
      // enterSearch
      className=" mb-1"
    />
      <div className="header-content">
        <div className="header-title">Danh sách sản phẩm: {listProduct.length}</div>
        <Button 
        type="primary" 
        shape="round" 
        icon={<PlusCircleOutlined />} 
        size="middle" 
        onClick={() => setShowModal(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <ModalAddProduct visible={showModal} onCancel={() => setShowModal(false)}/>
    </div>
  )
}

export default Header