import { Card } from 'antd'
import React from 'react'

const RoleCard = ({data}: {data: string}) => {
    return (
        <Card style={{ width: 300 }} className='cursor-pointer'>
            <p>{data}</p>
        </Card>
    )
}

export default RoleCard