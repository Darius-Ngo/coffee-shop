import {
  Form,
  Input,
  Button,
  DatePicker,
  Col,
  Row,
  Radio,
  Select,
  Upload,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertStart, updateStart } from "../../redux";
import { getRegexMobile } from "../../../../../common/regexCommon";
import Modal from "../../../../../../components/Modal";

const ModalAddUser = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");

  useEffect(() => {
    if (props.userDetail) {
      setImg(props.userDetail.avatar);
      form.setFieldsValue({
        username: props.userDetail.username,
        password: props.userDetail.password,
        hoTen: props.userDetail.hoTen,
        email: props.userDetail.email,
        gioiTinh: props.userDetail.gioiTinh,
        phanQuyen: props.userDetail.phanQuyen,
        sdt: props.userDetail.sdt,
        diaChi: props.userDetail.diaChi,
      });
      if (props.userDetail.ngaySinh) {
        form.setFieldsValue({
          ngaySinh: moment(props.userDetail.ngaySinh, "YYYY-MM-DD"),
        });
      }
    } else {
      setImg("");
      form.resetFields();
    }
  }, [props.userDetail, props.visible]);

  const {
    userManager: { status },
  } = useSelector((state) => state);

  useEffect(() => {
    if (status === "success" || status === "error") {
      props.onCancel();
      form.resetFields();
    }
  }, [status]);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const value = form.getFieldsValue(true);
      if (props.userDetail) {
        const body = {
          id: props.userDetail.id,
          avatar: img,
          username: value.username,
          password: value.password,
          hoTen: value.hoTen,
          email: value.email,
          gioiTinh: value.gioiTinh,
          phanQuyen: value.phanQuyen,
          sdt: value.sdt,
          diaChi: value.diaChi,
          ngaySinh: moment(value.ngaySinh).format("YYYY-MM-DD"),
        };
        dispatch(updateStart({ ...body }));
      } else {
        const body = {
          avatar: img,
          username: value.username,
          password: value.password,
          hoTen: value.hoTen,
          email: value.email,
          gioiTinh: value.gioiTinh || "",
          phanQuyen: value.phanQuyen || "",
          sdt: value.sdt || "",
          diaChi: value.diaChi || "",
          ngaySinh: moment(value.ngaySinh).format("YYYY-MM-DD") || "",
        };
        dispatch(insertStart({ ...body }));
      }
    });
  };
  const optionsGender = [
    { label: "Nam", value: 1 },
    { label: "Nữ", value: 2 },
    { label: "Khác", value: 0 },
  ];

  const uploadImage = async (options) => {
    const UPLOAD_URL = "https://co-coffeeshop.herokuapp.com/api/uploads";
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    };
    fmData.append("file", file);
    try {
      const res = await axios.post(UPLOAD_URL, fmData, config);
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
      width={600}
      title={
        props.user ? "Sửa thông tin người dùng" : "Thêm thông tin người dùng"
      }
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
            Ghi lại
          </Button>
        </div>
      }
    >
      <Spin spinning={status === "loading"}>
        <div className="wrap-form__register">
          <Form
            form={form}
            layout="vertical"
            className="form-content"
            initialValues={{}}
          >
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="Tên tài khoản"
                  name="username"
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
                  <Input
                    className="input-item"
                    allowClear
                    placeholder="tên tài khoản"
                    disabled={props.userDetail}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: !props.userDetail, message: "Nhập mật khẩu!" },
                    {
                      min: 6,
                      message: "Mật khẩu tối thiểu 6 ký tự!!",
                    },
                  ]}
                >
                  <Input.Password
                    className="input-item"
                    placeholder="mật khẩu"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="hoTen"
                  rules={[{ required: true, message: "Nhập họ tên!" }]}
                >
                  <Input
                    id="hoTen"
                    className="input-item"
                    allowClear
                    placeholder="họ tên"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input
                    id="email"
                    className="input-item"
                    allowClear
                    placeholder="nhập emai"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="ngaySinh">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder={["Chọn ngày sinh"]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giới tính" name="gioiTinh">
                  <Radio.Group options={optionsGender} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="SĐT"
                  name="sdt"
                  rules={[
                    {
                      pattern: getRegexMobile(),
                      message: "Số điện thoại không đúng!",
                    },
                  ]}
                >
                  <Input
                    id="sdt"
                    className="input-item"
                    allowClear
                    placeholder="số điện thoại"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phân quyền" name="phanQuyen">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="chọn phân quyền"
                  >
                    <Select.Option value="ADMIN">Quản trị viên</Select.Option>
                    <Select.Option value="USER">Người dùng</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Ảnh đại diện">
              <Upload
                accept="image/*"
                customRequest={uploadImage}
                listType="picture-card"
                multiple={false}
                maxCount={1}
                className="upload-list-inline"
              >
                <Button
                  className="btn-upload-avatar"
                  icon={<UploadOutlined />}
                ></Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Địa chỉ" name="diaChi">
              <Input.TextArea
                className="input-item"
                allowClear
                placeholder="Địa chỉ"
                style={{ height: 120 }}
              />
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalAddUser;
