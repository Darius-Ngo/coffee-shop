import { Table, Button, Space, Tooltip, Spin, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import {getListStart, insertStart, updateStart, deleteStart} from './redux';
import ModalAddUser from './components/ModalAddUser';
import ModalUserDetail from './components/ModalUserDetail';
import './styles.scss';

const UserManager = () => {
  const dispatch = useDispatch();

  const {
    userManager: { status ,data: {listUser}}
  } = useSelector((state) => state);

  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [showModalUserDetail, setShowModalUserDetail] = useState(false);
  const [userDetail, setUserDetail] = useState(undefined);

  useEffect(() => {
    dispatch(getListStart());
  },[])

  const showPromiseConfirmDeleteUser = (user) => {
    confirm({
      title: 'Xoá thể loại',
      icon: <DeleteOutlined color="red" />,
      width: '600px',
      content: (
        <div>
          Bạn có chắc chắn muốn xoá tài khoản
          <strong> {user?.username} </strong> của người dùng <strong> {user?.hoTen} </strong>
          không?
        </div>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk() {
        dispatch(deleteStart(user?.id));
      },
      onCancel() { },
    });
  };

  const columns = [
    {
      title: 'STT',
      render: ( record) => <div className="text-center">{listUser?.indexOf(record) + 1}</div>,
      key: 'id',
      width: '5%',
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      render: ( record) => <div className="text-center">
          <Avatar size={64} src={'https://co-coffeeshop.herokuapp.com'+record} />
      </div>,
      key: 'avatar'
    },
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
    {
      title: 'Phân quyền',
      dataIndex: 'phanQuyen',
      key: 'phanQuyen',
      render: ( record) => {
        switch (record) {
          case 'ADMIN':
            return (
              <div className="text-center">Quản trị viên</div>
            );
            break;
          case 'USER':
            return (
              <div className="text-center">Người dùng</div>
            );
            break;
          default:
            return (
              <div className="text-center"></div>
            );
        }
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      render: (text, record) => (
          <div className="text-center">
              <Space size="small">
                  <Tooltip title="Thông tin chi tiết" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<InfoCircleOutlined />}
                    className="btn-small btn-info-icon"
                    size='middle'
                    onClick={
                      () => {
                        setShowModalUserDetail(true);
                        setUserDetail(record);
                      }
                    }
                        />
                  </Tooltip>
                  <Tooltip title="Sửa thông tin" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<EditOutlined />}
                    className="btn-small btn-edit-icon"
                    size='middle'
                    onClick={
                      () => {
                        setShowModalAddUser(true);
                        setUserDetail(record);
                      }
                    }
                        />
                  </Tooltip>
                  <Tooltip title="Xóa thông tin" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<DeleteOutlined />} 
                    className="btn-small btn-delete-icon"
                    size='middle'
                    onClick={() => showPromiseConfirmDeleteUser(record)} 
                     />
                  </Tooltip>
              </Space>
          </div>
      ),
  },
  ];

  return (
    <div className="container_user-manager">
      <Spin spinning={status === "loading"}>
        <Header/>
        <Table 
        dataSource={listUser} 
        columns={columns} 
        bordered
        rowKey="id"
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
        />
        <ModalAddUser  
          visible={showModalAddUser}
          onCancel= {() => setShowModalAddUser(false)}
          userDetail={userDetail}
        />
        <ModalUserDetail
          visible={showModalUserDetail}
          onCancel= {() => setShowModalUserDetail(false)}
          userDetail={userDetail}
        />
      </Spin>
    </div>
  )
}

export default UserManager;