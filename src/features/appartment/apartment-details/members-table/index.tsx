import { APICall } from '@/utils/ApiCall'
import { message, Space, Table, Tag } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd';
import CustomCards from '@/components/CustomCards';

interface DataType {
  key: string;
  name: string;
  phone: string;
  roles: string[];
}

const MembersTable = () => {
    const params = useParams()
    const isMobile = window.innerWidth < 576
    const [tableData, setTableData] = useState<DataType[]>([])

    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Phone Number',
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
                let color = role.length > 5 ? 'geekblue' : 'green';
                if (role === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={role}>
                    {role}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: '',
          key: 'action',
          render: () => (
            <Space size="middle">
              {/* <a>Invite {record.name}</a> */}
              <a style={{color: '#f5222d'}}>Remove</a>
            </Space>
          ),
        },
      ];
    const membersRespInterceptor = (membersData: MembersResponseType[]) => {
        return membersData?.map(member => (
            {
                key: member?.user_detail?._id,
                name: `${member?.user_detail?.first_name} ${member?.user_detail?.middle_name || ''} ${member?.user_detail?.last_name || ''}`,
                phone: member?.user_detail?.phone,
                roles: member.roles.map(role => role?.name)
            }
        ))
    }
    useEffect(() => {
        const membersApiCall = async () => {
            const resp = await APICall<{result: MembersResponseType[]}>('get', `APARTMENT_MEMBERS?apartment_id=${params.id}`)

            if(resp?.success) {
                setTableData(membersRespInterceptor(resp?.data?.result))

            } else {
                message.error(resp?.message)
            }
        }
        membersApiCall()
    }, []) //eslint-disable-line
  return (
    <div>
        {
          isMobile ? 
            tableData?.map((member, index) => (
              <CustomCards key={index} title={member?.name} description={<div>
              <div>
                  {
                    member?.roles?.join(', ')
                  }
              </div>
              <div>{member?.phone}</div>
              </div>} photo="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClickHandler={() => {}} />
            ))
          
            : <Table<DataType> columns={columns} dataSource={tableData} pagination={false} />
        }
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
    roles: {_id: string, name: string}[]
}