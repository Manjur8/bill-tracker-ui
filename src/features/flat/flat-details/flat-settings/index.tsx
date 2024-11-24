import EmptyComponent from '@/components/EmptyComponent'
import { RolesPermissionsTypes } from '@/types/roles-permissions'
import { RulesPermissionsTypes } from '@/types/rules-permissions'
import { APICall } from '@/utils/ApiCall'
import { Card, Checkbox, Collapse, Flex, message, Modal, Spin, Table } from 'antd'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const RoleCard = ({data}: {data: string}) => {
    return (
        <Card style={{ width: 300 }} className='cursor-pointer'>
            <p>{data}</p>
        </Card>
    )
}

const FlatSettings = () => {
    const params = useParams()
    const [modal, setModal] = useState<{title: string, data: RolesPermissionsTypes} | false>(false)
    const [roles, setRoles] = useState<RolesPermissionsTypes | null>(null);
    // const [rolesLoading, setRolesLoading] = useState(true)

    const [rolesOptionLoader, setRolesOptionLoader] = useState(false)
    const [rolesOptions, setRolesOptions] = useState<RulesPermissionsTypes[]>([])

    useEffect(() => {
        const rolesApiCall = async () => {
            const resp = await APICall<{result: RolesPermissionsTypes}>('get', 'ROLES_PERMISSIONS?allocation=FLAT');
            if(resp?.success) {
                // console.log(resp?.data)
                setRoles(resp?.data?.result)
            } else {
                message?.error(resp?.message)
            }
            // setRolesLoading(false)
        }
        const rulesPermissionsApiCall = async () => {
            setRolesOptionLoader(true)
            // const endPoint = `RULES_PERMISSIONS?match={"flat_id":"${params.id}"}`
            const endPoint = `RULES_PERMISSIONS?match={"apartment_id":"${'67431fd7e6bd1b40d7299a68'}"}`
            const rulesResp = await APICall<{result: Array<RulesPermissionsTypes>}>('get', endPoint);
    
            if(rulesResp.success) {
                const rulesPermissions = rulesResp?.data?.result.map(
                    (rule) => ({
                      name: rule?.name,
                      _id: rule?._id,
                      paths: rule?.paths
                    }),
                  )
                  setRolesOptions(rulesPermissions)
            }
            setRolesOptionLoader(false)
        }
        rulesPermissionsApiCall()

        rolesApiCall()
    }, [params.id])
    const items = useMemo(() => ([
        {
          key: '1',
          label: 'Roles & Permissions',
          children: <Flex wrap align='center' gap={16}>{
                    rolesOptionLoader ? <Flex justify='center' align='center'><Spin /></Flex>
                    : rolesOptions?.length > 0 ? rolesOptions.map((role, index) => (
                        <div key={index} onClick={() => {
                            const values = roles && Object.entries(roles)?.map((role2) => ({
                                [role2?.[0]]: { ...role2?.[1], value: role?.paths?.[role2?.[0]] }
                            }))
                            const output = values && values.reduce((acc, value) => {//+
                                const key = Object.keys(value)[0];//+
                                acc[key] = value[key];//+
                                return acc;
                              }, {});
                            setModal({title: role?.name, data:output as unknown as RolesPermissionsTypes || false})
                        }}>
                            <RoleCard data={role?.name} />
                        </div>
                    ))  : <EmptyComponent />
                }</Flex>
        },
        {
          key: '2',
          label: 'Other',
          children: <p>No data to show</p>,
        }
      ]), [roles, rolesOptionLoader, rolesOptions]);
      const getDataSource = (datas: RolesPermissionsTypes) => {
        return Object?.values(datas).map((item, index) => ({
            key: index,
            create: item?.allowed_perm?.includes('POST') ? <Checkbox defaultChecked={item?.value?.includes('POST')} /> : '-',
            list: item?.allowed_perm?.includes('GET') ? <Checkbox defaultChecked={item?.value?.includes('GET')} /> : '-',
            edit: item?.allowed_perm?.includes('PUT') || item?.allowed_perm?.includes('PATCH') ? <Checkbox defaultChecked={item?.value?.includes('PUT') || item?.value?.includes('PATCH')} /> : '-',
            delete: item?.allowed_perm?.includes('DELETE') ? <Checkbox defaultChecked={item?.value?.includes('DELETE')} /> : '-',
            service: item?.name
        }));
      }
    //   const dataSource = [
    //     {
    //     key: '1',
    //     create: <Checkbox defaultChecked />,
    //     list: <Checkbox />,
    //     edit: <Checkbox defaultChecked />,
    //     delete: <Checkbox />,
    //     service: 'Service 1'
    //     },
    //     {
    //     key: '2',
    //     create: <Checkbox defaultChecked />,
    //     list: <Checkbox defaultChecked />,
    //     edit:<Checkbox />,
    //     delete: <Checkbox defaultChecked />,
    //     service: 'Service 2',
    //     },
    //     ];

        const columns = [
        {
        title: 'Create',
        dataIndex: 'create',
        key: 'create',
        },
        {
        title: 'List',
        dataIndex: 'list',
        key: 'list',
        },
        {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        },
        {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        },
        {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        },
    ];
  return (
    <div>
        <Collapse defaultActiveKey={['1']} collapsible="header" items={items} />
        {modal && <Modal title={modal?.title} open={Object?.keys(modal?.data)?.length > 0} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
            <Table dataSource={getDataSource(modal?.data)} columns={columns} pagination={{position: ['none', 'none']}} />
        </Modal>}
    </div>
  )
}

export default FlatSettings