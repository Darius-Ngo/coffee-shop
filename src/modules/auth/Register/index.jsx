import { Form, Input, Button } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../redux";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import {getRegexPassword} from "../../common/regexCommon";
import "./styles.scss";

const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 2000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

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
        phanQuyens: ["admin"],
      };
      if (value.password === value.confirmPassword) {
        dispatch(registerStart({ ...body }));
        props.onCancel();
        form.resetFields();
      } else {
        toast.warning("Mật khẩu xác nhận không khớp!", options);
        form.setFieldsValue({
          confirmPassword: "",
        });
        confirmPassword.current.focus();
      }
    });
  };

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title="Đăng ký tài khoản"
      footer={
        <div key="footer" className="d-flex justify-content-end">
          <Button
            key="back"
            onClick={props.onCancel}
            className="btn-form-register__cancel"
          >
            Hủy
          </Button>
          <Button
            $fill
            key="submit"
            onClick={handleSubmit}
            className="btn-form-register__submit"
          >
            Đăng ký
          </Button>
        </div>
      }
    >
      <div className="wrap-form__register">
        <Form
          form={form}
          layout="vertical"
          className="form-content"
          initialValues={{}}
        >
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true, message: "Nhập họ tên!" }]}
          >
            <Input id="hoTen" placeholder="Nhập họ tên" className="input-item" allowClear />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Nhập email!" },
              {
                type: "email",
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input id="email" placeholder="Nhập email" className="input-item" allowClear />
          </Form.Item>
          <Form.Item
            label="Tên tài khoản"
            name="username"
            defaultValue=""
            rules={[
              { required: true, message: "Nhập tên tài khoản!" },
              {
                min: 6,
                message: "Tài khoản tối thiểu 6 ký tự!",
              },
              {
                max: 18,
                message: "Tài khoản tối đa 18 ký tự!",
              },
            ]}
          >
            <Input id="username" placeholder="Nhập tên tài khoản" className="input-item" allowClear />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            defaultValue=""
            rules={[
              { required: true, message: "Nhập mật khẩu!" },
              {
                pattern: getRegexPassword(),
                message:
                  "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
              },
            ]}
          >
            <Input.Password id="password" placeholder="Nhập mật khẩu" className="input-item" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              { required: true, message: "Xác nhận mật khẩu!" },
              {
                min: 6,
                message: "Mật khẩu tối thiểu 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              id="confirmPassword"
              ref={confirmPassword}
              className="input-item"
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default RegisterForm;
