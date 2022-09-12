import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {getRegexPassword} from "../../common/regexCommon";
import { changePasswordApi } from "../../../core/apis/auth";
import Modal from "../../../components/Modal";
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
const ChangePassForm = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel } = props;
  const User = localStorage.getItem("User");
  useEffect(() => {
    form.resetFields();
  },[visible])

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const value = form.getFieldsValue(true);
      const body = {
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      };
      if (value.newPassword === value.confirmPassword) {
        changePasswordApi(body).then((res) => {
          if (res.ok) {
            toast.success("Đổi mật khẩu thành công.", options);
            onCancel();
            form.resetFields();
          } else {
            toast.error(res.message, options);
          }
        });
      } else {
        toast.error("Mật khẩu xác nhận không đúng.", options);
      }
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Đổi mật khẩu"
      footer={
        <div key="footer" className="d-flex justify-content-end">
          <Button
            key="back"
            onClick={onCancel}
            className="btn-form-forgotPass__cancel"
          >
            Hủy
          </Button>
          <Button
            $fill
            key="submit"
            onClick={handleSubmit}
            className="btn-form-forgotPass__submit"
          >
            Đổi mật khẩu
          </Button>
        </div>
      }
    >
      <div className="wrap-form__forgotPass">
        <Form form={form} layout="vertical" className="form-content">
          <Form.Item
            label="Mật khẩu cũ"
            name="currentPassword"
            rules={[{ required: true, message: "Nhập mật khẩu cũ!" }]}
          >
            <Input.Password
              id="currentPassword"
              placeholder="nhập nội dung"
              className="input-item"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Nhập mật khẩu mới!" },
              {
                pattern: getRegexPassword(),
                message:
                  "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
              },
            ]}
          >
            <Input.Password
              id="newPassword"
              placeholder="nhập nội dung"
              className="input-item"
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: "Xác nhận mật khẩu!" }]}
          >
            <Input.Password
              id="confirmPassword"
              placeholder="nhập nội dung"
              className="input-item"
              allowClear
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangePassForm;
