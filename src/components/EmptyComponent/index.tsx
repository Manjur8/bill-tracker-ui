import { Button, Space } from 'antd'
import {ExclamationCircleOutlined, LoadingOutlined} from '@ant-design/icons';
import React from 'react'

const EmptyComponent = ({message='No Data Found!', buttonClickHandler, loading=false}: {message?: string, buttonClickHandler?: () => void, loading?: boolean }) => {
  return (
    <Space style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', background: '#fff', width: '100%'}}>
        {
            loading ? <LoadingOutlined style={{fontSize: '24px'}} /> : <ExclamationCircleOutlined style={{fontSize: '24px'}} />
        }
        <p style={{fontSize: '14px'}}>
            {message}
            {
                buttonClickHandler && <span> Please <Button variant='text' disabled={loading} onClick={buttonClickHandler} color='default' className={`p-0 ${loading ? '' : 'theme-primary'}`}>Click here</Button> to add</span>
            }
        </p>
        
    </Space>
  )
}

export default EmptyComponent