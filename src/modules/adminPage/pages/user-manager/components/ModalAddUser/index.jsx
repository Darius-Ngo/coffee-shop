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
import { getRegexMobile, getRegexPassword } from "../../../../../common/regexCommon";
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
    { label: "N???", value: 2 },
    { label: "Kh??c", value: 0 },
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
        props.user ? "S???a th??ng tin ng?????i d??ng" : "Th??m th??ng tin ng?????i d??ng"
      }
      footer={
        <div key="footer" className="d-flex justify-content-end">
          <Button
            key="back"
            onClick={props.onCancel}
            className="btn-form-register__cancel"
          >
            H???y
          </Button>
          <Button
            $fill
            key="submit"
            onClick={handleSubmit}
            className="btn-form-register__submit"
          >
            Ghi l???i
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
                  label="T??n t??i kho???n"
                  name="username"
                  rules={[
                    { required: true, message: "Nh???p t??n t??i kho???n!" },
                    {
                      min: 6,
                      message: "T??i kho???n t???i thi???u 6 k?? t???!",
                    },
                    {
                      max: 18,
                      message: "T??i kho???n t???i ??a 18 k?? t???!",
                    },
                  ]}
                >
                  <Input
                    className="input-item"
                    allowClear
                    placeholder="t??n t??i kho???n"
                    disabled={props.userDetail}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="M???t kh???u"
                  name="password"
                  rules={[
                    { required: !props.userDetail, message: "Nh???p m???t kh???u!" },
                    {
                      pattern: getRegexPassword(),
                      message:
                        "M???t kh???u c?? ch???a ??t nh???t 8 k?? t???, trong ???? c?? ??t nh???t m???t s??? v?? bao g???m c??? ch??? th?????ng v?? ch??? hoa v?? k?? t??? ?????c bi???t, v?? d??? @, #, ?, !.",
                    },
                  ]}
                >
                  <Input.Password
                    className="input-item"
                    placeholder="m???t kh???u"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="H??? t??n"
                  name="hoTen"
                  rules={[{ required: true, message: "Nh???p h??? t??n!" }]}
                >
                  <Input
                    id="hoTen"
                    className="input-item"
                    allowClear
                    placeholder="h??? t??n"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Nh???p email!" },
                    {
                      type: "email",
                      message: "Email kh??ng ????ng!",
                    },
                  ]}
                >
                  <Input
                    id="email"
                    className="input-item"
                    allowClear
                    placeholder="nh???p emai"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Ng??y sinh" name="ngaySinh">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder={["Ch???n ng??y sinh"]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gi???i t??nh" name="gioiTinh">
                  <Radio.Group options={optionsGender} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="S??T"
                  name="sdt"
                  rules={[
                    {
                      pattern: getRegexMobile(),
                      message: "S??? ??i???n tho???i kh??ng ????ng!",
                    },
                  ]}
                >
                  <Input
                    id="sdt"
                    className="input-item"
                    allowClear
                    placeholder="s??? ??i???n tho???i"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ph??n quy???n" name="phanQuyen">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="ch???n ph??n quy???n"
                  >
                    <Select.Option value="ADMIN">Qu???n tr??? vi??n</Select.Option>
                    <Select.Option value="USER">Ng?????i d??ng</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="???nh ?????i di???n">
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
            <Form.Item label="?????a ch???" name="diaChi">
              <Input.TextArea
                className="input-item"
                allowClear
                placeholder="?????a ch???"
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
