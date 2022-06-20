import { Form, Input, Button, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertStart, updateStart } from '../../redux';
import Modal from '../../../../../../components/Modal';

const ModalAddUser = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [img, setImg] = useState('');

    const {
      categoryManager: { status }
    } = useSelector((state) => state);

    useEffect(() => {
      if (props.categoryDetail) {
        form.setFieldsValue({
          tenLoaiSanPham: props.categoryDetail.tenLoaiSanPham,
          moTa: props.categoryDetail.moTa,
          anh: props.categoryDetail.anh,
        });
        setImg(props.categoryDetail.anh);
      } else {
        setImg('');
        form.resetFields();
      }
    }, [props.categoryDetail, props.visible]);

    useEffect(() => {
      if(status === 'success' || status === 'error') {
        props.onCancel();
        form.resetFields();
      }
    },[status])

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const value = form.getFieldsValue(true);
            if(props.categoryDetail) {
              const body = {
                id: props.categoryDetail.id,
                tenLoaiSanPham: value.tenLoaiSanPham,
                moTa: value.moTa,
                anh: img,
              }
              dispatch(updateStart({ ...body }))
            } else {
              const body = {
                tenLoaiSanPham: value.tenLoaiSanPham,
                moTa: value.moTa,
                anh: img,
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

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            title={props.user ? "Sửa loại sản phẩm" : "Thêm loại sản phẩm"}
            footer={
                <div key="footer" className="d-flex justify-content-end">
                    <Button key="back" onClick={props.onCancel} className='btn-form-register__cancel'>
                        Hủy
                    </Button>
                    <Button $fill key="submit" onClick={handleSubmit} className="btn-form-register__submit">
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
                        label='Tên loại sản phẩm'
                        name="tenLoaiSanPham"
                        rules={[{ required: true, message: 'Nhập tên loại!' }]}
                    >
                        <Input id='tenLoaiSanPham' className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Ảnh loại sản phẩm'
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

export default ModalAddUser