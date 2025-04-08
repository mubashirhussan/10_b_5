import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Binoculars, CheckCircle, Map } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const location = useLocation(); // Get the current location object
  const { id } = useParams();
  const getRouteTitle = (path) => {
    const match = path.match(/\/([a-zA-Z-]+)/);
    if (!match) return "";
    return match[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    const key = e.key;

    if (key === "1") navigate("/data-view");
    else if (key === "2") navigate("/mapping");
    else if (key === "3") navigate("/quality-gate");
  };

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
          onClick={handleMenuClick}
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <Binoculars size={20} />,
              label: "DATA VIEW",
            },
            {
              key: "2",
              icon: <Map size={20} />,
              label: "MAPPING",
            },
            {
              key: "3",
              icon: <CheckCircle size={20} />,
              label: "QUALITY GATE",
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
          <div className="flex items-center space-x-2">
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
            <div className="font-bold  uppercase">
              {`${getRouteTitle(location.pathname)}  ${id ? id : ""}`}
            </div>
          </div>
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
          <div className="h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
