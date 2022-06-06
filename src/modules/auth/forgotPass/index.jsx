import { Form, Input, Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../redux';
import Modal from '../../../components/Modal';
import './styles.scss';

const ForgotPassForm = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            title='Quên mật khẩu'
            footer={
                <div key="footer" className="d-flex justify-content-end">
                    <Button key="back" onClick={props.onCancel} className='btn-form-forgotPass__cancel'>
                        Hủy
                    </Button>
                    <Button $fill key="submit" onClick={props.onOk} className="btn-form-forgotPass__submit">
                        Lấy mật khẩu
                    </Button>
                </div>
            }
        >
            <div className="wrap-form__forgotPass">
                <Form
                    form={form}
                    layout='vertical'
                    className='form-content'
                >
                    <Form.Item
                        label='Tên tài khoản'
                        name="username"
                        rules={[{ required: true, message: 'Nhập tên tài khoản!' }]}
                    >
                        <Input id='username' className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Họ tên'
                        name="hoTen"
                        rules={[{ required: true, message: 'Nhập họ tên!' }]}
                    >
                        <Input id='hoTen' className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name="email"
                        rules={[{ required: true, message: 'Nhập email!' }]}
                    >
                        <Input id='email' className="input-item" allowClear />
                    </Form.Item>
                    {/* <Form.Item
                        label='Mật khẩu'
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    >
                        <Input.Password id='password' className="input-item" />
                    </Form.Item>
                    <Form.Item
                        label='Xác nhận mật khẩu'
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Xác nhận mật khẩu!' }]}
                    >
                        <Input id='confirmPassword' className="input-item" allowClear />
                    </Form.Item> */}
                </Form>
            </div>
        </Modal>
    )
}

export default ForgotPassForm