"use client"
import { Space } from 'antd'
import { ExclamationOutlined } from '@ant-design/icons'
import React from 'react'

const ErrorComponent = () => {
  return (
    <Space className='bg-white d-flex' style={{width: '500px'}}>
        <ExclamationOutlined />
        <div>404</div>
        <h3>Not Found</h3>
    </Space>
  )
}

export default ErrorComponent