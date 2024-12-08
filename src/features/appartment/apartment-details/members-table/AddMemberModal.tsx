"use client"
import DebounceSelect from '@/components/DebounceSelect';
import { APICall } from '@/utils/ApiCall';
// import useDebounce from '@/hooks/useDebounce';
import { Form, message, Modal, Select, Spin } from 'antd'
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { DataType } from '.';

interface UserValue {
    label: string;
    value: string;
  }

const AddMemberModal = ({open, onOk, onCancel, data, list}: AddMemberModalProps) => {
    const [form] = Form.useForm();
    const params = useParams();
    const searchParams = useSearchParams();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [value, setValue] = useState<UserValue[]>([]);
    const [rolesOptionLoader, setRolesOptionLoader] = useState(false);
    const [rolesOptions, setRolesOptions] = useState<{label: string, value: string}[]>([])

    const apartmentId = searchParams?.get('apartment_id')

    useEffect(() => {
        const rulesPermissionsApiCall = async () => {
            setRolesOptionLoader(true)
            const endpoint = list === 'apartment' ? `APARTMENT_ROLES?apartment_id=${params?.id}` : `FLAT_ROLES?apartment_id=${apartmentId}&flat_id=${params?.id}`;
            const rulesResp = await APICall<{result: Array<{name: string, _id: string}>}>('get', endpoint);
    
            if(rulesResp.success) {
                const rulesPermissions = rulesResp?.data?.result.map(
                    (rule) => ({
                      label: rule?.name,
                      value: rule?._id,
                    }),
                  )
                  setRolesOptions(rulesPermissions)
            }
            setRolesOptionLoader(false)
        }
        rulesPermissionsApiCall()
    }, [apartmentId, list, params?.id])

    async function fetchUserList(username: string): Promise<UserValue[]> {
        let updatedResp: UserValue[] = []

        if(username?.length > 3) {
            const resp = await APICall<{result: Array<{_id: string, first_name: string, middle_name: string, last_name: string}>}>('get', `USERS?search=${username}`);
    
            if(resp?.success) {
                updatedResp = resp?.data?.result.map(
                    (user) => ({
                      label: `${user?.first_name}${user?.middle_name ?  ' ' + user?.middle_name : ''} ${user?.last_name}`,
                      value: user?._id,
                    }),
                  )
            }
        }

        return updatedResp;
      }

      const handleSubmit = async (values: Record<string, unknown>) => {
        setSubmitLoader(true)
        const common_payload = {...values, user_ids: data ? (values as {user_ids: [string]})?.user_ids : (values as {user_ids: [{value: string}]})?.user_ids?.map(item => (item?.value))}
        const payload = list === 'apartment' ? {...common_payload, apartment_id: params?.id } : {...common_payload, flat_id: params?.id }
        // Add or edit member logic goes here
        const resp = await APICall('patch', list === 'apartment' ? 'APARTMENT_ADD_MEMBER' : 'ADD_FLAT_MEMBERS', payload)
        if(resp?.success) {
            message.success(resp?.message)
            onOk();
        } else {
            message.error(resp?.message)
        }
        setSubmitLoader(false)
      }

      const handleOk = () => {
        form.submit();
      }

      useEffect(() => {
        if(open) {
            if(data) {
                form.setFieldValue('user_ids', [data?.key])
                form.setFieldValue('role', data?.roles?.map((item) => (item?._id)))
            } else {
                form.setFieldValue('user_ids', [])
                form.setFieldValue('role', [])
            }
        }
      }, [data, form, open])
    
  return (
    <Modal
          title={data ?"Edit Member" : "Add Member"}
          open={open}
          // visible={addMemberModal}
          onOk={handleOk}
          onCancel={onCancel}
          confirmLoading={submitLoader}
          okText={data?"Update":"Save"}
          destroyOnClose
        >
            <Form onFinish={handleSubmit} form={form}>
          {/* <Select mode='multiple' options={[{label: 'Member A', value: 'a'}, {label: 'Member B', value: 'b'}]} className='w-100' /> */}
                <Form.Item name="user_ids" label="User" rules={[{ required: true, message: 'Please select a user' }]}>
                    {
                        data ? <Select mode='multiple' options={[{label: data?.name, value: data?.key}]} disabled />
                        : <DebounceSelect mode="multiple" value={value} placeholder="Select users" fetchOptions={fetchUserList} onChange={(newValue) => { setValue(newValue as UserValue[]); }} className='w-100' />
                    }
                </Form.Item>
            
                <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
                    <Select options={rolesOptions} mode='multiple' dropdownRender={(originNode) => rolesOptionLoader ? <Spin size='small' />: originNode}/>
                </Form.Item>
            </Form>
        </Modal>
  )
}

export default AddMemberModal

interface AddMemberModalProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: DataType | null
    list: 'apartment' | 'flat'
}