"use client"
import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Menu } from 'antd';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../app/favicon.ico'
import styles from './page.module.css'
import { getCookies } from '@/utils/cookies';

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
  const [collapsed, setCollapsed] = useState(true)
  const isPublicPage = pathName.startsWith('/auth')
  const [userInfo, setUserInfo] = useState({first_name: '', last_name: ''})
  useEffect(() => {
    async function getUserInfo () {
      const parsedData = JSON.parse(await getCookies('user-info') || '')
       setUserInfo(parsedData)
    }
    getUserInfo()
  }, [])

  return isPublicPage ? (
    <AntdRegistry>
        {children}
    </AntdRegistry>
  ) : (
    <AntdRegistry>
        <Layout>
            <Sider
                // trigger={isMobileScreen}
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
                  // =========Trigger onClick==========
                // console.log(collapsed, type);
                // setCollapsed(collapsed)
                }}
                trigger={
                  <>
                      <Divider className='mt-mb-4' />
                  <div className={`d-flex gap-8 align-items-center text-align-left m-4 ${styles.sidebar_trigger_padding}`}>
                      <Image src={logo} alt="image" width={36} height={36} className={collapsed ? styles.profile_img : ''} />
                      
                      {
                        !collapsed && (
                          <div>
                            <h4 className='text-secondary'>Hi,</h4>
                            <h4 className='text-primary'>{userInfo?.first_name}</h4>
                          </div>
                        )
                      }
                  </div>
                  </>
                }
            >
                <div className="demo-logo-vertical" />
                <>
                  <div className={`d-flex flex-direction-column gap-8 align-items-center justify-content-center text-align-left m-4 ${collapsed ? styles.sidebar_trigger_padding_collapsed : styles.sidebar_trigger_padding}`}>
                      <Image src={logo} alt="image" width={36} height={36} />
                      
                      {
                        !collapsed && (
                          <div>
                            <h4 className='text-primary'>Bill Tracker</h4>
                          </div>
                        )
                      }
                  </div>
                      <Divider className='mt-mb-4' />
                  </>
                <Menu mode="inline" defaultSelectedKeys={['1']} items={items}/>
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