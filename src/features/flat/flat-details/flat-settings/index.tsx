import EmptyComponent from '@/components/EmptyComponent'
import RoleCreateModal from '@/components/RoleCreateModal'
import { RolesPermissionsTypes } from '@/types/roles-permissions'
import { RulesPermissionsTypes } from '@/types/rules-permissions'
import { APICall } from '@/utils/ApiCall'
import { Button, Collapse, Flex, message, Spin } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import RoleCard from '@/components/RoleCard'

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

    const items = useMemo(() => ([
        {
          key: '1',
          label: 'Roles & Permissions',
          extra: <Button type='primary' onClick={() => {setModal(true); setModalValues({editable: true, paths: {}} as RulesPermissionsTypes)}}><PlusOutlined /> Create Role</Button>,
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

      const closeModal = useCallback(() => {
        setModal(false)
        setModalValues(null)
      }, [])
      
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
  return (
    <>
        <Collapse defaultActiveKey={['1']} collapsible="header" items={items} />
        {modal && modalValues && rolesConfig && <RoleCreateModal {...{modalValues, modal, closeModal, setRolesList, setModalValues, rolesConfig}} />}
    </>
  )
}

export default FlatSettings