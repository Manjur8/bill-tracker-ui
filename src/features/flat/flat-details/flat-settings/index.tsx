import EmptyComponent from '@/components/EmptyComponent'
import { RolesPermissionsTypes } from '@/types/roles-permissions'
import { RulesPermissionsTypes } from '@/types/rules-permissions'
import { APICall } from '@/utils/ApiCall'
import { Card, Checkbox, Collapse, Flex, message, Modal, Spin, Table } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'
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
    const searchParams = useSearchParams()
    const apartment_id = searchParams.get('apartment_id')
    const [modal, setModal] = useState<boolean>(false)
    const [modalValues, setModalValues] = useState<RulesPermissionsTypes | null>(null);
    const [rolesConfig, setRolesConfig] = useState<RolesPermissionsTypes | null>(null);
    // const [rolesLoading, setRolesLoading] = useState(true)

    const [rolesLoader, setRolesLoader] = useState(false)
    const [rolesList, setRolesList] = useState<RulesPermissionsTypes[]>([])

    useEffect(() => {
        const rolesConfigApiCall = async () => {
            const resp = await APICall<{result: RolesPermissionsTypes}>('get', 'ROLES_PERMISSIONS_CONFIG?allocation=FLAT');
            if(resp?.success) {
                // console.log(resp?.data)
                setRolesConfig(resp?.data?.result)
            } else {
                message?.error(resp?.message)
            }
            // setRolesLoading(false)
        }
        const rolesPermissionsApiCall = async () => {
            setRolesLoader(true)
            // const endPoint = `ROLES_PERMISSIONS?match={"flat_id":"${params.id}"}`
            const endPoint = `FLAT_ROLES?apartment_id=${apartment_id}&flat_id=${params.id}`
            const rolesResp = await APICall<{result: Array<RulesPermissionsTypes>}>('get', endPoint);
    
            if(rolesResp.success) {
                setRolesList(rolesResp?.data?.result)
            }
            setRolesLoader(false)
        }
        rolesPermissionsApiCall()

        rolesConfigApiCall()
    }, [apartment_id, params.id])

    useEffect(() => {
        if(modal) {
            
        }
    }, [modal])
    const items = useMemo(() => ([
        {
          key: '1',
          label: 'Roles & Permissions',
          children: <Flex wrap align='center' gap={16}>{
                    rolesLoader ? <Flex justify='center' align='center'><Spin /></Flex>
                    : rolesList?.length > 0 ? rolesList.map((role, index) => (
                        <div key={index} onClick={() => {
                            // const values = rolesConfig && Object.entries(rolesConfig)?.map((role2) => ({
                            //     [role2?.[0]]: { ...role2?.[1], value: role?.paths?.[role2?.[0]] }
                            // }))
                            // const output = values && values.reduce((acc, value) => {//+
                            //     const key = Object.keys(value)[0];//+
                            //     acc[key] = value[key];//+
                            //     return acc;
                            //   }, {});
                            setModal(true);
                            setModalValues(role);
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
      ]), [rolesLoader, rolesList]);
      const handleCheckbox = (key: string, val: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', checked: boolean) => {
        setModalValues((prev) => {
            return prev && ({
                ...prev,
                paths: {
                    ...prev?.paths,
                   [key]:  checked? [...(prev?.paths?.[key] as string[] || []), val] : prev?.paths?.[key]?.filter((item) => item!== val)
                }
            })
        })
      };
      const getDataSource = (config: RolesPermissionsTypes, modalValues: RulesPermissionsTypes) => {
        return Object?.entries(config).map(([key, value], index) => ({
            key: index,
            create: value?.allowed_perm?.includes('POST') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('POST')} disabled={!modalValues?.editable} onChange={(e) => handleCheckbox(key, 'POST', e.target.checked)} /> : '-',
            list: value?.allowed_perm?.includes('GET') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('GET')} disabled={!modalValues?.editable} onChange={(e) => handleCheckbox(key, 'GET', e.target.checked)} /> : '-',
            edit: value?.allowed_perm?.includes('PUT') || value?.allowed_perm?.includes('PATCH') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('PUT') || modalValues?.paths?.[key]?.includes('PATCH')} disabled={!modalValues?.editable} onChange={(e) => {handleCheckbox(key, 'PUT', e.target.checked); handleCheckbox(key, 'PATCH', e.target.checked) }} /> : '-',
            delete: value?.allowed_perm?.includes('DELETE') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('DELETE')} disabled={!modalValues?.editable} onChange={(e) => handleCheckbox(key, 'DELETE', e.target.checked)} /> : '-',
            service: value?.name
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
        // render: (_: unknown, record: unknown) => {
        //     console.log(record, 'gg')
        //     return <Checkbox defaultChecked={true}  />
        // }
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
        {modal && modalValues && rolesConfig && <Modal title={modalValues?.name} open={modal} onOk={() => console.log(modalValues, 'ss')} onCancel={() => setModal(false)}>
            <Table dataSource={getDataSource(rolesConfig, modalValues)} columns={columns} pagination={{position: ['none', 'none']}} />
        </Modal>}
    </div>
  )
}

export default FlatSettings