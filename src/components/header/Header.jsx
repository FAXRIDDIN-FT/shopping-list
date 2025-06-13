import React from "react";
import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./header.css";

const { Header } = Layout;

const HeaderBar = () => {
  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <Header className="header">
      <div className="header-title">
        <div className="left-section">
          <Avatar icon={<UserOutlined />} className="header-avatar" />
        </div>
        <div className="center-section">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="right-section">
          <button onClick={logOut} className="logout-button">Log Out</button>
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;

