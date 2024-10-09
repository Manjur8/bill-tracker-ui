import { Card } from 'antd'
import Image from 'next/image'
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons'
import React from 'react'
import Meta from 'antd/es/card/Meta'
import { CustomCardTypes } from '@/types/appartment'

const CustomCards = ({title, description, photo}: CustomCardTypes) => {
  return (
    <Card
    style={{ width: 350 }}
    cover={
      <Image
        alt="example"
        src={photo}
        width={300}
        height={200}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
    //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={title}
      description={description}
    />
  </Card>
  )
}

export default CustomCards