"use client"
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const CustomLayout = ({children}: {children: React.ReactNode}) => {
  const pathName = usePathname();
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [collapsed, setCollapsed] = useState(isMobileScreen)

  const isPublicPage = pathName.startsWith('/auth')

  return isPublicPage ? (
    <AntdRegistry>
        {children}
    </AntdRegistry>
  ) : (
    <AntdRegistry>
        <Layout>
            <Sider trigger={isMobileScreen}
                collapsible collapsed={collapsed}
                className='siderStyle'
                breakpoint="md"
                collapsedWidth={isMobileScreen ? "0" : "60"}
                onBreakpoint={(broken) => {
                // console.log(broken);
                    setIsMobileScreen(broken)
                }}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
                setCollapsed(collapsed)
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu mode="inline" defaultSelectedKeys={['4']} items={items} />
                {/* <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                }}
            /> */}
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff' }}>
                {
                    isMobileScreen && (
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
                    )
                }
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </AntdRegistry>
  )
};

export default CustomLayout;