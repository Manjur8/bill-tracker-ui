import { APICall } from '@/utils/ApiCall'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, message, Space, Table, Tag } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd';
import CustomCards from '@/components/CustomCards';
import AddMemberModal from './AddMemberModal';
import DeleteModdal from '@/components/DeleteModal';
import { useSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'

export interface DataType {
  key: string;
  name: string;
  phone: string;
  roles: RolesType[];
}

const MembersTable = () => {
    const params = useParams()
    const userInfo = useSelector((state: RootState) => state.userInfo)
    const isMobile = window.innerWidth < 576
    const [tableData, setTableData] = useState<DataType[]>([])

    const [addMemberModal, setAddMemberModal] = useState(false)
    const [deleteModdal, setDeleteModal] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [deleteData, setDeleteData] = useState<DataType | null>(null)

    const [editMemberData, setEditMemberData] = useState<DataType | null>(null)

    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, {key}) => <a>{text} {key === userInfo?.user_id && '(You)'}</a>,
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Role',
          key: 'role',
          dataIndex: 'role',
          render: (_, { roles }) => (
            <>
              {roles.map((role) => {
                let color = role?.name?.length > 5 ? 'geekblue' : 'green';
                if (role?.name === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={role?._id}>
                    {role?.name}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: '',
          key: 'action',
          render: (record) => {
            return record?.key !== userInfo?.user_id && (
              <Space size="middle">
                {/* <a>Invite {record.name}</a> */}
                <a onClick={() =>  {setEditMemberData(record); setAddMemberModal(true)}}><EditOutlined /></a>
                <a style={{color: '#f5222d'}} onClick={() =>  {setDeleteData(record); setDeleteModal(true)}}><DeleteOutlined /></a>
              </Space>
            )
          },
        },
      ];
    const membersRespInterceptor = (membersData: MembersResponseType[]) => {
        return membersData?.map(member => (
            {
                key: member?.user_detail?._id,
                name: `${member?.user_detail?.first_name} ${member?.user_detail?.middle_name || ''} ${member?.user_detail?.last_name || ''}`,
                phone: member?.user_detail?.phone,
                roles: member?.roles
            }
        ))
    }
    const membersApiCall = async () => {
        const resp = await APICall<{result: MembersResponseType[]}>('get', `APARTMENT_MEMBERS?apartment_id=${params.id}`)

        if(resp?.success) {
            setTableData(membersRespInterceptor(resp?.data?.result))

        } else {
            message.error(resp?.message)
        }
    }
    useEffect(() => {
        membersApiCall()
    }, []) //eslint-disable-line

    const deleteMember = async () => {
      setDeleteLoader(true)
      const payload = {
        user_id: deleteData?.key,
        apartment_id: params.id
      }
      const resp = await APICall('patch', 'APARTMENT_MEMBERS_DELETE', payload)
      setDeleteLoader(false)
      if(resp?.success) {
        message.success(resp?.message)
        setTableData(tableData.filter(member => member.key!== deleteData?.key))
        setDeleteModal(false)
        setDeleteData(null)
      } else {
        message.error(resp?.message)
      }
      setDeleteLoader(false)
    }
  return (
    <div>
      <>
              <div className='d-flex justify-content-between align-items-center'>
                <h3>Members</h3>
                <Button type='primary' onClick={() => {setEditMemberData(null); setAddMemberModal(true)}}>Add Member</Button>
              </div>
        {
          isMobile ? 
            tableData?.map((member, index) => (
              <CustomCards key={index} title={member?.name} actions={[
                <EditOutlined key={'edit-icon'} onClick={() =>  {setEditMemberData(member); setAddMemberModal(true)}}/>,
                <DeleteOutlined key={'delete-icon'} onClick={() =>  {setDeleteData(member); setDeleteModal(true)}}/>
              ]} description={<div>
              <div>
                  {
                    member?.roles?.map(i => i?.name)?.join(', ')
                  }
              </div>
              <div>{member?.phone}</div>
              </div>} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClickHandler={() => {}} />
            ))
          
            :
              <Table<DataType> columns={columns} dataSource={tableData} pagination={false} />
        }
      </>
        <AddMemberModal open={addMemberModal} onOk={() => {membersApiCall(); setAddMemberModal(false)}} onCancel={() => setAddMemberModal(false)} data={editMemberData} />
        <DeleteModdal open={deleteModdal} handleOk={deleteMember} handleCancel={() => {setDeleteModal(false); setDeleteData(null)}} submitLoader={deleteLoader} title={'Member'} />
    </div>
  )
}

export default MembersTable

interface MembersResponseType {
    user_detail: {
        _id: string,
        first_name: string,
        middle_name?: string,
        last_name: string,
        phone: string,
    }
    roles: RolesType[]
}

interface RolesType {
  _id: string, name: string
}