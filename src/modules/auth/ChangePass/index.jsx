import { Form, Input, Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../redux';
import Modal from '../../../components/Modal';
import './styles.scss';

const ChangePassForm = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {visible, onCancel} = props;
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title='Đổi mật khẩu'
            footer={
                <div key="footer" className="d-flex justify-content-end">
                    <Button key="back" onClick={onCancel} className='btn-form-forgotPass__cancel'>
                        Hủy
                    </Button>
                    <Button $fill key="submit" onClick={props.onOk} className="btn-form-forgotPass__submit">
                        Đổi mật khẩu
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
                        label='Mật khẩu cũ'
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu cũ!' }]}
                    >
                        <Input.Password id='password' placeholder="nhập nội dung" className="input-item" />
                    </Form.Item>
                    <Form.Item
                        label='Mật khẩu mới'
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]}
                    >
                        <Input.Password id='confirmPassword' placeholder="nhập nội dung" className="input-item" allowClear />
                    </Form.Item>
                    <Form.Item
                        label='Xác nhận mật khẩu'
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Xác nhận mật khẩu!' }]}
                    >
                        <Input.Password id='confirmPassword' placeholder="nhập nội dung" className="input-item" allowClear />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ChangePassForm;