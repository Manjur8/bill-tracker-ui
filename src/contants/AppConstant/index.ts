import React from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '@/app/favicon.ico'
import type { MenuProps } from 'antd';
import authSvg from '../../../public/images/auth.svg'



export const App_Name = 'Bill Tracker';

export const defaultMenus = [
  {
    key: 'register',
    icon: React.createElement(UserOutlined),
    label: `Register`,
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

export const apartmentMenu = {
  key: 'appartment',
  icon: React.createElement(UploadOutlined),
  label: `Apartment`,
}

export const flatMenu = {
  key: 'flat',
  icon: React.createElement(VideoCameraOutlined),
  label: `Flat`,
}

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
