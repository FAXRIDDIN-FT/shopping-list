
import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderBar from "../components/header/Header";

const { Content } = Layout;
const MainLayout = ({ children }) => {
  return (
     <Layout>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
