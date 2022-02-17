import React from "react";
import {Modal, Button, Space, Tooltip} from "antd";

import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


const { confirm } = Modal;

const RemoveBasketMessage = ({ deleteHandle, product }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Bu ürünü sepetten kaldırmak istediğinizden emin misiniz ?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "Evet",
      okType: "danger",
      cancelText: "Hayır",
      onOk() {
        deleteHandle(product);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space>
      <Tooltip title="Sil">
      <Button
        onClick={showDeleteConfirm}
        type="primary"
        danger
        style={{ display: "flex", alignItems: "center" }}
      >
        <DeleteOutlined />
      </Button>
      </Tooltip>
    </Space>
  );
};

export default RemoveBasketMessage;
