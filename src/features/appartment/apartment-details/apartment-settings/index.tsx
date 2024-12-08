import { RulesPermissionsTypes } from '@/types/rules-permissions';
import { Button, Collapse, Flex, message, Spin } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { RolesPermissionsTypes } from '@/types/roles-permissions';
import EmptyComponent from '@/components/EmptyComponent';
import RoleCard from '@/components/RoleCard';
import RoleCreateModal from '@/components/RoleCreateModal';
import { APICall } from '@/utils/ApiCall';
import { useParams } from 'next/navigation';
import DeleteModdal from '@/components/DeleteModal';

const ApartmentSettings = () => {
    const params = useParams()
    const [modal, setModal] = useState<boolean>(false)
    const [modalValues, setModalValues] = useState<RulesPermissionsTypes | null>(null);
    const [rolesConfig, setRolesConfig] = useState<RolesPermissionsTypes | null>(null);
    const [rolesLoader, setRolesLoader] = useState(false)
    const [rolesList, setRolesList] = useState<RulesPermissionsTypes[]>([])

    // =======Delete Role states======
    const [deleteModdal, setDeleteModal] = useState<RulesPermissionsTypes | null>(null)
    const [deleteLoader, setDeleteLoader] = useState(false)

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
                            <RoleCard data={role} setDeleteModal={setDeleteModal} />
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

    const apartment_id = params?.id

      useEffect(() => {
        const rolesConfigApiCall = async () => {
            const resp = await APICall<{result: RolesPermissionsTypes}>('get', 'ROLES_PERMISSIONS_CONFIG?allocation=APARTMENT');
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
            const endPoint = `APARTMENT_ROLES?apartment_id=${apartment_id}`
            const rolesResp = await APICall<{result: Array<RulesPermissionsTypes>}>('get', endPoint);
    
            if(rolesResp.success) {
                setRolesList(rolesResp?.data?.result)
            }
            setRolesLoader(false)
        }
        rolesPermissionsApiCall()

        rolesConfigApiCall()
    }, [apartment_id])
    const closeModal = useCallback(() => {
        setModal(false)
        setModalValues(null)
      }, [])

    const handleDeleteRole = async (role: RulesPermissionsTypes) => {
        setDeleteLoader(true)
        const resp = await APICall<{message: string}>('delete', `DELETE_ROLES_PERMISSIONS?role_id=${role._id}`)
        if(resp?.success) {
            message.success(resp?.message)
            const updatedRolesList = rolesList.filter((r) => r._id!== role._id)
            setRolesList(updatedRolesList)
            setDeleteModal(null)
        } else {
            message.error(resp?.message)
        }
        setDeleteLoader(false)
    }

  return (
    <>
        <Collapse defaultActiveKey={['1']} collapsible="header" items={items} />
        {modal && modalValues && rolesConfig && <RoleCreateModal {...{modalValues, modal, closeModal, setRolesList, setModalValues, rolesConfig}} />}
        <DeleteModdal open={Boolean(deleteModdal)} handleOk={() => {handleDeleteRole(deleteModdal as RulesPermissionsTypes)}}  handleCancel={() => {setDeleteModal(null)}} submitLoader={deleteLoader} title='Role' />
    </>
  )
}

export default ApartmentSettings