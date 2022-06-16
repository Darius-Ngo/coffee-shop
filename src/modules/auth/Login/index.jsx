import { Form, Input, Button, Spin } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../redux';
import ReduxType from '../../../redux/types';
import RegisterForm from '../Register';
import ForgotPassForm from '../forgotPass';
import './styles.scss';
import backrgoundImg from '../../../assets/img/caphe.jpg';

const LoginForm = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalForgotPass, setShowModalForgotPass] = useState(false);
    const passWord = useRef();

    const {
        auth: { status },
    } = useSelector((state) => state);

    const handleLogin = async () => {
        form.validateFields().then(() => {
            const value = form.getFieldsValue(true);
            const body = {
                username: value.username,
                password: value.password
            }
            dispatch(loginStart({ ...body }));
        });
    };

    useEffect(() => {
        if (status === ReduxType.ERROR) {
            form.setFieldsValue({
                password: '',
            });
            passWord.current.focus();
        }
        if (status === ReduxType.SUCCESS) {
            navigate('/');
        }
    }, [status])

    return (
        <Spin spinning={status === ReduxType.LOADING} tip="Loading..." size="middle">
            <div className="container-app">
                <div className="wrap-form">
                    <div className="wrap-form__border">
                        <div className="wrap-form__content">
                            <div className="wrap-form__content__img">
                                <img src={backrgoundImg} alt="" />
                            </div>
                            <div className="wrap-form__content__form">
                                <div className="wrap-form__content__form__heading">Tiệm cà phê bất ổn.</div>
                                <Form
                                    form={form}
                                    layout='vertical'
                                    className='form-content'
                                    initialValues={{}}
                                >
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
                                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                                    >
                                        <Input.Password ref={passWord} id='password' className="input-item" />
                                    </Form.Item>

                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className='btn-login' onClick={handleLogin}>
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                    <div className="wrap-form__content__form__footer">
                                        <div className="register" onClick={() => setShowModalRegister(true)}>
                                            Đăng ký
                                        </div>
                                        <div className="forgot-pass" onClick={() => setShowModalForgotPass(true)}>
                                            Quên mật khẩu?
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterForm visible={showModalRegister} onCancel={() => setShowModalRegister(false)} />
            <ForgotPassForm visible={showModalForgotPass} onCancel={() => setShowModalForgotPass(false)} />
        </Spin>
    )
}

export default LoginForm