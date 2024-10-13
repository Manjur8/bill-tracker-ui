"use client"
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../page.module.css'
import type { DropdownProps, MenuProps } from 'antd';
// import { getCookies } from '@/utils/cookies';
import { App_Name, HeaderNavProfileMenus, Logo1, Logo2, SidebarMenus } from '@/contants/AppConstant';
import { type RootState } from '@/lib/store';
import { useSelector } from '@/lib/hooks';

const { Header, Content, Footer, Sider } = Layout;

const PrivateLayout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const [openProfileMenus, setOpenProfileMenus] = useState(false)

  const onDropdownHandler: MenuProps['onClick'] = ({ key }) => {
    if(key!=='logout')setOpenProfileMenus(false)
    console.log(`Click on item ${key}`);
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenProfileMenus(nextOpen);
    }
  };

  return (
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
                    //   style={{maxHeight: '90vh'}}
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      onCollapse={(collapsed, type) => {
                        // =========Trigger onClick==========
                      // console.log(collapsed, type);
                      // setCollapsed(collapsed)
                      }}
                      // trigger={
                      //   <>
                      //       <Divider className='mt-mb-4' />
                      //   <div className={`d-flex gap-8 align-items-center text-align-left m-4 ${styles.sidebar_trigger_padding}`}>
                      //       <Image src={Logo1} alt="image" width={36} height={36} className={collapsed ? styles.profile_img : ''} />
                            
                      //       {
                      //         !collapsed && (
                      //           <div>
                      //             <h4 className='text-secondary'>Hi,</h4>
                      //             <h4 className='text-primary'>{userInfo?.first_name}</h4>
                      //           </div>
                      //         )
                      //       }
                      //   </div>
                      //   </>
                      // }
                      trigger={null}
                  >
                      <div className="demo-logo-vertical" />
                      <>
                        <div className={`d-flex flex-direction-column gap-8 align-items-center justify-content-center text-align-left m-4 ${collapsed ? styles.sidebar_trigger_padding_collapsed : styles.sidebar_trigger_padding}`}>
                            <Image src={Logo2} alt="image" width={32} height={32} />
                            
                            {
                              !collapsed && (
                                <div>
                                  <h4 className='text-primary'>{App_Name}</h4>
                                </div>
                              )
                            }
                        </div>
                            <Divider className='mt-mb-4' />
                        </>
                      <Menu mode="inline" defaultSelectedKeys={['1']} items={SidebarMenus} onClick={({key }) => router.push(`/${key}`)}/>
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
                      <Header style={{ background: '#fff' }} className='d-flex justify-content-between align-items-center header-navbar'>
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
                        <div className={collapsed ? 'header-nav-profile-collapsed' : 'header-nav-profile'}>
                          <Dropdown menu={{items: HeaderNavProfileMenus, onClick: onDropdownHandler}} trigger={['click']} open={openProfileMenus} onOpenChange={handleOpenChange}>
                            <div className={`d-flex gap-8 align-items-center m-4 cursor-pointer`}>
                                <Image src={Logo1} alt="image" width={36} height={36} />
                                
                                <div>
                                  <h4><span className='text-secondary'>Hi, </span><span className='text-primary'>{userInfo?.first_name}</span></h4>
                                </div>
                            </div>
                          </Dropdown>
                        </div>
                      </Header>
                      <Content style={{ margin: '24px 16px 0' }}>
                      {children}
                      </Content>
                      <Footer style={{ textAlign: 'center' }}>
                        {App_Name} ©{new Date().getFullYear()}
                      </Footer>
                  </Layout>
              </Layout>
  )
}

export default PrivateLayout