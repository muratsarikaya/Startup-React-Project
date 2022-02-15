import React from "react";
import { Modal, Button, Space } from "antd";

import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


const { confirm } = Modal;

const AcceptMessage = ({ deleteHandle, productId }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Bu ürünü silmek istediğinizden emin misiniz ?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "Evet",
      okType: "danger",
      cancelText: "Hayır",
      onOk() {
        deleteHandle(productId);
        console.log(productId);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space>
      <Button
        onClick={showDeleteConfirm}
        type="primary"
        danger
        style={{ display: "flex", alignItems: "center" }}
      >
        <DeleteOutlined />
      </Button>
    </Space>
  );
};

export default AcceptMessage;
