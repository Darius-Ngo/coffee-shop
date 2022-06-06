import { Form, Input, Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart } from '../redux';
import Modal from '../../../components/Modal';
import { toast } from 'react-toastify';
import './styles.scss';

const options = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
}

const RegisterForm = (props) => {
    const confirmPassword = useRef();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, []);

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const value = form.getFieldsValue(true);
            const body = {
                hoTen: value.hoTen,
                email: value.email,
                username: value.username,
                password: value.password,
                phanQuyens: ['admin']
            }
            if (value.password === value.confirmPassword) {
                dispatch(registerStart({ ...body }));
                props.onCancel();
                form.resetFields();
            } else {
                toast.warning('Mật khẩu xác nhận không khớp!', options);
                form.setFieldsValue({
                    confirmPassword: '',
                });
                confirmPassword.current.focus();
            }
        });
    }

    const formatEmail = (email) => {
        const pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(email)) {
          return false;
        } else {
          return true;
        }
      };

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            title='Đăng ký tài khoản'
            footer={
                <div key="footer" className="d-flex justify-content-end">
                    <Button key="back" onClick={props.onCancel} className='btn-form-register__cancel'>
                        Hủy
                    </Button>
                    <Button $fill key="submit" onClick={handleSubmit} className="btn-form-register__submit">
                        Đăng ký
                    </Button>
                </div>
            }
        >
            <div className="wrap-form__register">
                <Form
                    form={form}
                    layout='vertical'
                    className='form-content'
                >
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
                        rules={[
                            { required: true, message: 'Nhập email!' },
                            {
                                type: 'email',
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input id='email' className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Tên tài khoản'
                        name="username"
                        rules={[{ required: true, message: 'Nhập tên tài khoản!' }]}
                    >
                        <Input id='username' className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Mật khẩu'
                        name="password"
                        rules={[
                        { required: true, message: 'Nhập mật khẩu!' },
                        {
                            min: 6,
                            message: 'Mật khẩu tối thiểu 6 ký tự!',
                        },]}
                    >
                        <Input.Password id='password' className="input-item" />
                    </Form.Item>
                    <Form.Item
                        label='Xác nhận mật khẩu'
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Xác nhận mật khẩu!' },
                        {
                            min: 6,
                            message: 'Mật khẩu tối thiểu 6 ký tự!',
                        },]}
                    >
                        <Input.Password id='confirmPassword' ref={confirmPassword} className="input-item" />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default RegisterForm