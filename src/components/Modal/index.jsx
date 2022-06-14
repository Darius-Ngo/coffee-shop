import { Modal, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import React from 'react';
import './styles.scss';
const ModalForm = (props) => {
    return (
        <Modal
            bodyStyle={props.bodyStyle}
            style={props.style}
            title={props.title}
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            width={props.width}
            className={`wrap-modal ${props.className ? props.className : ''}`}
            destroyOnClose
            maskClosable={props.maskClosable}
            footer={
                props.footer || props.footer === null
                    ? props.footer
                    : [
                        <div key="footer" className="d-flex justify-content-end">
                            <Button color="primary" key="back" onClick={props.onCancel}>
                                Đóng
                            </Button>
                            <Button color="primary" $fill key="submit" onClick={props.onOk}>
                                <SaveOutlined />
                                Ghi nhận
                            </Button>
                        </div>,
                    ]
            }
        >
            {props.children}
        </Modal>
    );
};
export default ModalForm;
