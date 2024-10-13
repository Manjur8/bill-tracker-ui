import React from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '@/app/favicon.ico'
import type { MenuProps } from 'antd';
import authSvg from '../../../public/images/auth.svg'



export const App_Name = 'Bill Tracker';

export const SidebarMenus = [
    {
      key: 'register',
      icon: React.createElement(UserOutlined),
      label: `Register`,
    },
    {
      key: 'appartment',
      icon: React.createElement(UploadOutlined),
      label: `Appartment`,
    },
    {
      key: 'flat',
      icon: React.createElement(VideoCameraOutlined),
      label: `Flat`,
    },
    {
      key: 'my-profile',
      icon: React.createElement(UserOutlined),
      label: `My Profile`,
    },
    {
      key: 'settings',
      icon: React.createElement(VideoCameraOutlined),
      label: `Settings`,
    },   
]

export const Logo1 = logo; // used for profile image on sidebar

export const Logo2 = authSvg;

export const HeaderNavProfileMenus: MenuProps['items'] = [
  {
    key: 'my-profile',
    label: 'My Profile',
    // disabled: true,
    icon: React.createElement(UserOutlined),
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: React.createElement(LogoutOutlined),
  },
];
