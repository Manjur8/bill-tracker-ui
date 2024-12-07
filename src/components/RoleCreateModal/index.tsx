import { RolesPermissionsTypes } from '@/types/roles-permissions';
import { RulesPermissionsTypes } from '@/types/rules-permissions';
import { APICall } from '@/utils/ApiCall';
import { Checkbox, Form, Input, message, Modal, Table } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'

const RoleCreateModal = ({modalValues, modal, closeModal, setRolesList, setModalValues, rolesConfig}: RoleCreateModalProps) => {
    const [form] = useForm();
    const [submitLoader, setSubmitLoader] = useState(false)
    const searchParams = useSearchParams()
    const apartment_id = searchParams.get('apartment_id');

    const isUpdate = modalValues?.name
    
    const handleSubmit = useCallback(
        async (formValues: Record<string, string>, data: RulesPermissionsTypes) => {
            setSubmitLoader(true)
          // const apartment_id = data?.apartment_id
        //   const createPayload = {apartment_id: data?.apartment_id, role_for: apartment_id ? ["FL"] : ["AP"], name: formValues?.name, paths: data?.paths }
          const payload = isUpdate ? {apartment_id: data?.apartment_id, role_id: data?._id, data: { name: formValues?.name, paths: data?.paths }} : {apartment_id,  name: formValues?.name, paths: data?.paths, role_for: apartment_id ? ["FLAT"] : ["APARTMENT"]}
          const resp = await APICall<{result: RulesPermissionsTypes}>('post', isUpdate ? 'UPDATE_ROLES_PERMISSIONS' : 'ROLES_PERMISSIONS', payload);
          if(resp?.success) {
            setRolesList((prevRoles) => isUpdate ? prevRoles?.map(item => item?._id === data?._id ? {...item, name: formValues?.name, paths: {...item?.paths, ...data?.paths}} : item) : [...prevRoles, resp?.data?.result])
            message?.success(resp?.message)
            closeModal()
            // rolesPermissionsApiCall()
          } else {
            message?.error(resp?.message)
          }
          setSubmitLoader(false)
        },
        [apartment_id, closeModal, isUpdate, setRolesList],
      )
      const handleCheckbox = (key: string, val: 'GET' | 'POST' | 'PUT' | 'DELETE', checked: boolean) => {
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
            edit: value?.allowed_perm?.includes('PUT') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('PUT')} disabled={!modalValues?.editable} onChange={(e) => {handleCheckbox(key, 'PUT', e.target.checked)}} /> : '-',
            delete: value?.allowed_perm?.includes('DELETE') ? <Checkbox checked={modalValues?.paths?.[key]?.includes('DELETE')} disabled={!modalValues?.editable} onChange={(e) => handleCheckbox(key, 'DELETE', e.target.checked)} /> : '-',
            service: value?.name
        }));
      }
  return (
    <Modal title={isUpdate ? 'Update Role' : 'Create Role'} open={modal} onOk={() => form.submit()} onCancel={() => closeModal()} okText={isUpdate ? "Update" : "Save"} confirmLoading={submitLoader} okButtonProps={{disabled: !modalValues?.editable}}>
    <Form form={form} onFinish={(val) => handleSubmit(val, modalValues)} disabled={!modalValues?.editable} initialValues={{name: modalValues?.name}}>
        <Form.Item label='Role Name' name="name" rules={[{ required: true, message: 'Please enter Role Name!' }]}>
            <Input />
        </Form.Item>
    </Form>
    <Table dataSource={getDataSource(rolesConfig, modalValues)} columns={columns} pagination={{position: ['none', 'none']}} />
</Modal>
  )
}

export default RoleCreateModal

interface RoleCreateModalProps {
    modalValues: RulesPermissionsTypes
    modal: boolean
    closeModal: () => void
    setRolesList: React.Dispatch<React.SetStateAction<RulesPermissionsTypes[]>>
    setModalValues: React.Dispatch<React.SetStateAction<RulesPermissionsTypes | null>>
    rolesConfig: RolesPermissionsTypes
}

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