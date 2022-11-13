import { Table, Button, Space, Tooltip, Spin, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import { BASE_URL } from "../../../../core/constant";
import {getListStart, deleteStart} from './redux';
import ModalAddCategory from './components/ModalAddCategory';
import './styles.scss';

const CategoryManager = () => {
  const dispatch = useDispatch();

  const {
    categoryManager: { status ,data: {listCategory}}
  } = useSelector((state) => state);

  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState(undefined);

  useEffect(() => {
    dispatch(getListStart());
  },[]);

  const showPromiseConfirmDeleteCategory = (category) => {
    confirm({
      title: 'Xoá danh mục',
      icon: <DeleteOutlined color="red" />,
      width: '600px',
      content: (
        <div>
          Bạn có chắc chắn muốn xoá danh mục
          <strong> {category?.tenLoaiSanPham} </strong>
          không?
        </div>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk() {
        dispatch(deleteStart(category?.id));
      },
      onCancel() { },
    });
  };

  const columns = [
    {
      title: 'STT',
      render: ( record) => <div className="text-center">{listCategory?.indexOf(record) + 1}</div>,
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'tenLoaiSanPham',
      key: 'tenLoaiSanPham',
      width: '20%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      width: '20%',
      render: (record) => (
        <div className="text-center">
          <Image
            width={200}
            src={BASE_URL+record}
          />
        </div>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '40%',
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
          <div className="text-center">
              <Space size="small">
                  <Tooltip title="Sửa danh mục" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<EditOutlined />}
                    className="btn-small btn-edit-icon"
                    size='middle'
                    onClick={
                      () => {
                        setShowModalAddCategory(true);
                        setCategoryDetail(record);
                      }
                    }
                        />
                  </Tooltip>
                  <Tooltip title="Xóa danh mục" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<DeleteOutlined />} 
                    className="btn-small btn-delete-icon"
                    size='middle'
                    onClick={() => showPromiseConfirmDeleteCategory(record)} 
                     />
                  </Tooltip>
              </Space>
          </div>
      ),
  },
  ];

  return (
    <div className="container_category-manager">
      <Spin spinning={status === "loading"}>
        <Header/>
        <Table 
        dataSource={listCategory} 
        columns={columns} 
        bordered
        rowKey= "id"
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
        />
        <ModalAddCategory  
          visible={showModalAddCategory}
          onCancel= {() => setShowModalAddCategory(false)}
          categoryDetail={categoryDetail}
        />
      </Spin>
    </div>
  )
}

export default CategoryManager;