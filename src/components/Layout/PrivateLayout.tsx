"use client"
import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Layout, Menu, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../page.module.css'
import type { DropdownProps, MenuProps } from 'antd';
// import { getCookies } from '@/utils/cookies';
import { apartmentMenu, App_Name, HeaderNavProfileMenus, Logo1, Logo2 } from '@/contants/AppConstant';
import { type RootState } from '@/lib/store';
import { useDispatch, useSelector } from '@/lib/hooks';
import { generateSideMenus } from '@/utils/features';
import { APICall } from '@/utils/ApiCall';
import { initialUserInfoState, setUserInfo } from '@/utils/slices/userInfo';
import { deleteCookies } from '@/utils/cookies';

const { Header, Content, Footer, Sider } = Layout;

const PrivateLayout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const [openProfileMenus, setOpenProfileMenus] = useState(false)
  const [sideMenus, setSideMenus] = useState<typeof apartmentMenu[]>([])
  const [selectedMenu, setSelectedMenu] = useState<string[]>([])
  // const [logoutLoading, setLogoutLoading] = useState(false)

  const logoutHandler = async () => {
    // setLogoutLoading(true)
    const resp = await APICall('delete', 'USERS_SIGNOUT');
    if(resp?.success) {
      dispatch(setUserInfo(initialUserInfoState))
      await deleteCookies('auth-token')
      router.push('/auth/sign-in')
    } else {
      message.error(resp?.message)
      // setLogoutLoading(false)
    }
  }

  const onDropdownHandler: MenuProps['onClick'] = async ({ key }) => {
    if(key!=='logout')setOpenProfileMenus(false)
    console.log(`Click on item ${key}`);
    switch(key) {
      case 'logout': {
        await logoutHandler();
        // cookies.remove('token')
        // router.push('/login')
        break;
        }
      default:
        break;
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenProfileMenus(nextOpen);
    }
  };

  useEffect(() => {
    const finalSideMenus = generateSideMenus(userInfo?.apartment_access, userInfo?.flat_access)
    setSideMenus(finalSideMenus)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedMenu([pathName.slice(1, pathName.length)])
  }, [pathName])

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
                      <Menu mode="inline" items={sideMenus} onClick={({key }) => router.push(`/${key}`)} selectedKeys={selectedMenu}/>
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