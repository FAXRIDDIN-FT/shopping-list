import React, { useState } from "react";
import { Layout, Menu, Modal, Button, Form, Input, message } from "antd";
import "./Sidebar.css";
import { ShoppingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await api.post("/groups", {
        name: values.groupName,
        username: values.username,
        password: values.password,
      });

      message.success("Group created!");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Please fill all required fields correctly.");
    }
  };

  const menuItems = [
    { key: "/", label: "Home", icon: <ShoppingOutlined /> },
    { key: "/groups", label: "Groups", icon: <ShoppingOutlined /> },
  ];

  return (
    <Sider className="custom-sider">
      <div className="sidebar-content">
        <div className="admin">
          <h1>Shopping list</h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          onClick={(item) => navigate(item.key)}
          items={menuItems}
        />

        <div className="create-button-wrapper">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="create-button"
          >
            Create Group
          </Button>
        </div>
      </div>

      <Modal
        title="Create New Group"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
        

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form> 
      </Modal>
    </Sider>
  );
};

export default Sidebar;
