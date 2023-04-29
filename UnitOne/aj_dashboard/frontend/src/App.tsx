import React, { useState } from 'react';
import './App.scss'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Breadcrumb, Button, Layout, Menu, theme , } from 'antd';
import Link from "antd/es/typography/Link";

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];
//
// function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }


type MenuItem = {
  label : string,
  icon: React.ReactNode,
  key: number
}
const items: MenuItem[] = [
  {
    label: 'Option 1',
    key: 1,
    icon : <PieChartOutlined />
  },
  {
    label: 'Option 2',
    key:2 ,
    icon : <PieChartOutlined />
  },
  {
    label: 'Option 3 ',
    key: 3,
    icon : <PieChartOutlined />
  }
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" >
            {items.map((item) => (
                <Menu.Item key={item?.key} className={"menu-item"}>
                  <span className={"selected-item-indicator"}></span>
                  <span className={"item-text"}>
                     {item?.icon}
                    <span className="ant-menu-title-content">{item?.label}</span>
                  </span>
                </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  );
};

export default App;