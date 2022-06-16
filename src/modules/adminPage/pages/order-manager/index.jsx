import { Table, Button, Space, Tooltip, Spin, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import {getListStart, getListDetailStart} from './redux';
import ModalOrderDetail from './components/ModalOrderDetail';
import './styles.scss';

const OrderManager = () => {
  const dispatch = useDispatch();

  const {
    orderManager: { status ,data: {listOrder, listDetail}}
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getListStart());
    dispatch(getListDetailStart(14));
  },[]);

  console.log('listOrder', listOrder);

  const columns = [
    // {
    //   title: 'STT',
    //   render: ( record) => <div className="text-center">{listUser?.indexOf(record) + 1}</div>,
    //   key: 'id',
    //   width: '5%',
    // },
    // {
    //   title: 'Ảnh đại diện',
    //   dataIndex: 'avatar',
    //   render: ( record) => <div className="text-center">
    //       <Avatar size={64} src={'https://co-coffeeshop.herokuapp.com'+record} />
    //   </div>,
    //   key: 'avatar'
    // },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  //   {
  //     title: 'Thao tác',
  //     dataIndex: 'operation',
  //     key: 'operation',
  //     width: 100,
  //     render: (text, record) => (
  //         <div className="text-center">
  //             <Space size="small">
  //                 <Tooltip title="Thông tin chi tiết" color="#2a2a2a" mouseLeaveDelay={0}>
  //                   <Button 
  //                   icon={<InfoCircleOutlined />}
  //                   className="btn-small btn-info-icon"
  //                   size='middle'
  //                   onClick={
  //                     () => {
  //                       setShowModalUserDetail(true);
  //                       setUserDetail(record);
  //                     }
  //                   }
  //                       />
  //                 </Tooltip>
  //                 <Tooltip title="Sửa thông tin" color="#2a2a2a" mouseLeaveDelay={0}>
  //                   <Button 
  //                   icon={<EditOutlined />}
  //                   className="btn-small btn-edit-icon"
  //                   size='middle'
  //                   onClick={
  //                     () => {
  //                       setShowModalAddUser(true);
  //                       setUserDetail(record);
  //                     }
  //                   }
  //                       />
  //                 </Tooltip>
  //                 <Tooltip title="Xóa thông tin" color="#2a2a2a" mouseLeaveDelay={0}>
  //                   <Button 
  //                   icon={<DeleteOutlined />} 
  //                   className="btn-small btn-delete-icon"
  //                   size='middle'
  //                   onClick={() => showPromiseConfirmDeleteUser(record)} 
  //                    />
  //                 </Tooltip>
  //             </Space>
  //         </div>
  //     ),
  // },
  ];

  return (
    <div className="container_user-manager">
      <Spin spinning={status === "loading"}>
        <Header/>
        <Table 
        // dataSource={listUser} 
        columns={columns} 
        bordered
        rowKey="id"
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
        />
      </Spin>
    </div>
  )
}

export default OrderManager;