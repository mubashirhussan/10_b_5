import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";

import Index from "../pages/Inbox/Index";
const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh", // Ensure the sidebar spans the full height of the viewport
          position: "fixed", // Fix the sidebar position on the left
          top: 0, // Align it to the top
          left: 0, // Position it at the left
          bottom: 0, // Ensure it reaches the bottom
          zIndex: 1, // Ensure the sidebar stays below the header
          overflowY: "auto", // Allow vertical scrolling within the sidebar if needed
        }}
      >
        <div
          style={{
            color: "#fff", // Title color
            fontSize: "18px",
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#001529", // Background color
          }}
        >
          10b5
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "INBOX",
            },
            {
              key: "2",
              icon: <UploadOutlined />,
              label: "QUALITY",
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            // style={{
            //   fontSize: "16px",
            //   width: 64,
            //   height: 64,
            // }}
            className="ml-2 no-focus-outline"
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            scrollBehavior: "auto",
          }}
        >
          <div>
            <Index />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
