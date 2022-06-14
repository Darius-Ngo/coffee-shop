import { Table, Button, Space, Tooltip, Spin, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListStart, deleteStart} from './redux';
import Header from './components/Header';
import ModalAddProduct from './components/ModalAddProduct';
import './styles.scss';

const ProductManager = () => {
  const dispatch = useDispatch();

  const {
    productManager: { status ,data: {listProduct}}
  } = useSelector((state) => state);

  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(undefined);

  useEffect(() => {
    dispatch(getListStart());
  },[]);

  const showPromiseConfirmDelete = (item) => {
    confirm({
      title: 'Xoá sản phẩm',
      icon: <DeleteOutlined color="red" />,
      width: '600px',
      content: (
        <div>
          Bạn có chắc chắn muốn xoá sản phẩm
          <strong> {item?.tenSanPham} </strong>
          không?
        </div>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk() {
        dispatch(deleteStart(item?.id));
      },
      onCancel() { },
    });
  };

  const columns = [
    {
      title: 'STT',
      render: ( record) => <div className="text-center">{listProduct?.indexOf(record) + 1}</div>,
      key: 'id',
      width: '10%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      width: '15%',
      render: (record) => (
        <div className="text-center">
          <Image
            width={100}
            src={'https://co-coffeeshop.herokuapp.com'+record}
          />
        </div>
      )
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'loaiSanPham',
      key: 'loaiSanPham',
      width: '20%',
      render: (record) => (
        <div>{record.tenLoaiSanPham}</div>
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham',
      width: '20%',
    },
    {
      title: 'Giá(VNĐ)',
      children: [
        {
          title: 'Size S',
          dataIndex: 'giaBanSizeS',
          key: 'giaBanSizeS',
          width: 70,
        },
        {
          title: 'Size M',
          dataIndex: 'giaBanSizeM',
          key: 'giaBanSizeM',
          width: 70,
        },
        {
          title: 'Size L',
          dataIndex: 'giaBanSizeL',
          key: 'giaBanSizeL',
          width: 70,
        },
      ],
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
                        setProductDetail(record);
                        setShowModalAddProduct(true);
                      }
                    }
                        />
                  </Tooltip>
                  <Tooltip title="Xóa danh mục" color="#2a2a2a" mouseLeaveDelay={0}>
                    <Button 
                    icon={<DeleteOutlined />} 
                    className="btn-small btn-delete-icon"
                    size='middle'
                    onClick={() => showPromiseConfirmDelete(record)} 
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
        dataSource={listProduct} 
        columns={columns} 
        bordered
        rowKey= "id"
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
        />
        <ModalAddProduct  
          visible={showModalAddProduct}
          onCancel= {() => setShowModalAddProduct(false)}
          productDetail={productDetail}
        />
      </Spin>
    </div>
  )
}

export default ProductManager;