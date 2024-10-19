import { Avatar, Card } from 'antd'
// import Image from 'next/image'
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons'
import React from 'react'
// import Meta from 'antd/es/card/Meta'
import { CustomCardTypes } from '@/types/appartment'

const CustomCards = ({title, description, photo, onClickHandler}: CustomCardTypes) => {
  const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];
  return (
  //   <Card
  //   style={{ width: 350 }}
  //   cover={
  //     <Image
  //       alt="example"
  //       src={photo}
  //       width={300}
  //       height={200}
  //     />
  //   }
  //   actions={[
  //     <SettingOutlined key="setting" />,
  //     <EditOutlined key="edit" />,
  //     <EllipsisOutlined key="ellipsis" />,
  //   ]}
  // >
  //   <Meta
  //   //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
  //     title={title}
  //     description={description}
  //   />
  // </Card>
  <Card onClick={onClickHandler}
        actions={actions}
        style={{
          minWidth: 300,
        }}
      >
        <Card.Meta
          avatar={<Avatar src={photo} />}
          title={title}
          description={description}
        />
      </Card>
  )
}

export default CustomCards