import { Button, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { RulesPermissionsTypes } from '@/types/rules-permissions'
const RoleCard = ({data, setDeleteModal}: RoleCardProps) => {
    return (
        <Card style={{ width: 300 }} className='cursor-pointer'>
            <div className='d-flex justify-content-between align-items-center'>
                <p>{data?.name}</p>
                {
                    data?.editable && <Button variant='text' color='danger' onClick={(e) => {e.stopPropagation(); setDeleteModal(data)}}>
                        <DeleteOutlined />
                    </Button>
                }
            </div>
        </Card>
    )
}

export default RoleCard

interface RoleCardProps {
    data: RulesPermissionsTypes,
    setDeleteModal: React.Dispatch<React.SetStateAction<RulesPermissionsTypes | null>>
}