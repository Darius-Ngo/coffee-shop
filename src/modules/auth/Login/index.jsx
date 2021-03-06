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
                                <div className="wrap-form__content__form__heading">Ti???m c?? ph?? b???t ???n.</div>
                                <Form
                                    form={form}
                                    layout='vertical'
                                    className='form-content'
                                    initialValues={{}}
                                >
                                    <Form.Item
                                        label='T??n t??i kho???n'
                                        name="username"
                                        rules={[{ required: true, message: 'Nh???p t??n t??i kho???n!' }]}
                                    >
                                        <Input id='username' className="input-item" allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label='M???t kh???u'
                                        name="password"
                                        rules={[{ required: true, message: 'Nh???p m???t kh???u!' }]}
                                    >
                                        <Input.Password ref={passWord} id='password' className="input-item" />
                                    </Form.Item>

                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className='btn-login' onClick={handleLogin}>
                                            ????ng nh???p
                                        </Button>
                                    </Form.Item>
                                    <div className="wrap-form__content__form__footer">
                                        <div className="register" onClick={() => setShowModalRegister(true)}>
                                            ????ng k??
                                        </div>
                                        <div className="forgot-pass" onClick={() => setShowModalForgotPass(true)}>
                                            Qu??n m???t kh???u?
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