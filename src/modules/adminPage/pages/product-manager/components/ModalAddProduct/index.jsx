import { Form, Input, Button, Upload, Col, Row, Select, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertStart, updateStart } from '../../redux';
import {getListStart} from '../../../category-manager/redux';
import Modal from '../../../../../../components/Modal';

const ModalAddProduct = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [img, setImg] = useState('');
    const [idCategory, setIdcategory] = useState('');

    const {
      productManager: { status }
    } = useSelector((state) => state);
    const {
     data : {listCategory }
    } = useSelector((state) => state.categoryManager);

    useEffect(() => {
      dispatch(getListStart(''));
    },[])

    useEffect(() => {
      if (props.productDetail) {
        setIdcategory(props.productDetail.loaiSanPham.id)
        form.setFieldsValue({
          tenSanPham: props.productDetail.tenSanPham,
          moTa: props.productDetail.moTa,
          giaBanSizeS: props.productDetail.giaBanSizeS,
          giaBanSizeM: props.productDetail.giaBanSizeM,
          giaBanSizeL: props.productDetail.giaBanSizeL,
          loaiSanPham: props.productDetail.loaiSanPham.tenLoaiSanPham,
        });
        setImg(props.productDetail?.anh);
      } else {
        form.resetFields();
        setImg('');
      }
    }, [props.productDetail, props.visible]);

    useEffect(() => {
      if(status === 'success' || status === 'error') {
        props.onCancel();
        form.resetFields();
      }
    },[status])

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const value = form.getFieldsValue(true);
            if(props.productDetail) {
              const body = {
                id: props.productDetail.id,
                tenSanPham: value.tenSanPham,
                moTa: value.moTa,
                anh: img,
                giaBanSizeS: value.giaBanSizeS,
                giaBanSizeM: value.giaBanSizeM,
                giaBanSizeL: value.giaBanSizeL,
                idLoaiSanPham: idCategory,
              }
              dispatch(updateStart({ ...body }))
            } else {
              const body = {
                tenSanPham: value.tenSanPham,
                moTa: value.moTa,
                anh: img,
                giaBanSizeS: value.giaBanSizeS,
                giaBanSizeM: value.giaBanSizeM,
                giaBanSizeL: value.giaBanSizeL,
                idLoaiSanPham: idCategory,
              }
              dispatch(insertStart({ ...body }))
            }
        });
    }

    const uploadImage = async (options) => {
      const UPLOAD_URL = 'http://192.168.43.105:8080/api/uploads';
        const { onSuccess, onError, file } = options;
        const fmData = new FormData();
        const config = {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
            },
        };
        fmData.append("file", file);
        try {
            const res = await axios.post(
                UPLOAD_URL,
                fmData,
                config
            );
            onSuccess("Ok");
            setImg(res.data.message);
        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const onChange = (value) => {
      setIdcategory(value);
    }

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            title={props.user ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            footer={
                <div key="footer" className="d-flex justify-content-end">
                    <Button key="back" onClick={props.onCancel} className='btn-form-register__cancel'>
                        Hủy
                    </Button>
                    <Button key="submit" onClick={handleSubmit} className="btn-form-register__submit">
                        Ghi lại
                    </Button>
                </div>
            }
        >
          <Spin spinning={status === "loading"}>
                <Form
                    form={form}
                    layout='vertical'
                    className='form-content'
                >
                    
                    <Form.Item
                        label='Tên sản phẩm'
                        name="tenSanPham"
                        rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}
                    >
                        <Input id='tenSanPham' className="input-item" allowClear placeholder="tên sản phẩm"/>
                    </Form.Item>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item
                          label='Loại sản phẩm'
                          name="loaiSanPham"
                          rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}
                        >
                          <Select placeholder="Chọn loại sản phẩm" onChange={onChange}>
                            {listCategory?.length > 0 && listCategory.map((item, i) => (
                              <Select.Option value={item.id} key={i}>{item.tenLoaiSanPham}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label='Giá size S'
                          name="giaBanSizeS"
                          rules={[{ required: true, message: 'Nhập giá sản phẩm!' }]}
                        >
                          <Input className="input-item" allowClear placeholder="nhập giá"/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item
                          label='Giá size M'
                          name="giaBanSizeM"
                          rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}
                        >
                          <Input className="input-item" allowClear placeholder="nhập giá"/>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label='Giá size L'
                          name="giaBanSizeL"
                          rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}
                        >
                          <Input className="input-item" allowClear placeholder="nhập giá"/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                        label='Ảnh sản phẩm'
                        required
                        rules={[
                          {
                            required: true,
                            message: 'vui lòng chọn ảnh của bạn!',
                          },
                        ]}
                    >
                      <Upload
                        accept="image/*"
                        customRequest={uploadImage}
                        listType="picture"
                        multiple={false}
                        maxCount={1}
                        className="upload-list-inline"
                      >
                        <Button className="btn-upload-avatar" icon={<UploadOutlined />}>Chọn file</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                        label='Mô tả'
                        name="moTa"
                    >
                        <Input.TextArea 
                        className="input-item" 
                        allowClear 
                        placeholder="Mô tả" 
                        style={{ height: 120 }}
                        />
                    </Form.Item>
                </Form>
          </Spin>
        </Modal>
    )
}

export default ModalAddProduct;