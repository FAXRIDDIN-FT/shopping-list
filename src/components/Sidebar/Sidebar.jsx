import React, { useState, useEffect } from "react";
import { Layout, Menu, Modal, Button, Input, Form, message } from "antd";
import './Sidebar.css';
import { ShoppingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getMyGroups = async () => {
    const res = await axios.get("https://nt-shopping-list.onrender.com/api/groups", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log(res.data);
  };

  useEffect(() => {
    getMyGroups();
  }, []);

  const handleOk = async () => {
    const values = await form.validateFields();
    await axios.post(
      "https://nt-shopping-list.onrender.com/api/groups",
      {
        name: values.name,
        password: values.password,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    message.success("Group created!");
    form.resetFields();
    setIsModalOpen(false);
    getMyGroups();
  };

  const menuItems = [
    {
     key: "/",
     label: "Home",
     icon: <ShoppingOutlined />,
   },
    {
      key: "/groups",
      label: "Groups",
      icon: <ShoppingOutlined />,
    }
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
          defaultSelectedKeys={["/"]}
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
            label="Group Name"
            name="name"
            rules={[{ required: true, message: "Please enter a group name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Sider>
  );
};

export default Sidebar;
