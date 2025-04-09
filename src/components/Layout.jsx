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
  const location = useLocation();
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

  // Determine the selected key based on the current pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes("/data-view")) return "1";
    if (path.includes("/mapping")) return "2";
    if (path.includes("/quality")) return "3";
    return "1"; // default to first item if no match
  };

  const handleMenuClick = (e) => {
    const key = e.key;
    if (key === "1") navigate("/data-view");
    else if (key === "2") navigate("/mapping");
    else if (key === "3") navigate("/quality");
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#001529",
          }}
        >
          10B5-1
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[getSelectedKey()]} // Use selectedKeys instead of defaultSelectedKeys
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
              className="ml-2 no-focus-outline"
            />
            <div className="font-bold uppercase">
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
