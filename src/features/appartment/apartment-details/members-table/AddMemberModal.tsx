"use client"
import DebounceSelect from '@/components/DebounceSelect';
import { APICall } from '@/utils/ApiCall';
// import useDebounce from '@/hooks/useDebounce';
import { Form, message, Modal, Select } from 'antd'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

interface UserValue {
    label: string;
    value: string;
  }

const AddMemberModal = ({open, onOk, onCancel, data}: AddMemberModalProps) => {
    const [form] = Form.useForm();
    const params = useParams();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [value, setValue] = useState<UserValue[]>([]);

    async function fetchUserList(username: string): Promise<UserValue[]> {
        let data: UserValue[] = []

        if(username?.length > 3) {
            const resp = await APICall<{result: Array<{_id: string, first_name: string, middle_name: string, last_name: string}>}>('get', `USERS?search=${username}`);
    
            if(resp?.success) {
                data = resp?.data?.result.map(
                    (user) => ({
                      label: `${user?.first_name}${user?.middle_name ?  ' ' + user?.middle_name : ''} ${user?.last_name}`,
                      value: user?._id,
                    }),
                  )
            }
        }

        return data;
      }

      const handleSubmit = async (values: Record<string, unknown>) => {
        setSubmitLoader(true)
        // Add or edit member logic goes here
        const resp = await APICall('patch', 'APARTMENT_ADD_MEMBER', {...values, apartment_id: params?.id, user_id: (values as {user_id: [{value: string}]})?.user_id[0]?.value})
        if(resp?.success) {
            message.success(resp?.message)
            onOk();
        } else {
            message.error(resp?.message)
        }
        setSubmitLoader(false)
      }

      const staticRolesOptions = [
        { label: 'Admin', value: '670bcfb70ef5f5cd1ab6043a' },
        { label: 'Member', value:'67137af5d0b3c95f7c56bbf7' },
        { label: 'Flat Member', value:'67137af5d0b3c95f7c56bbf8' },
        { label: 'President', value:'67137af5d0b3c95f7c56bbf9' },
        // Add more static roles as needed
      ]

      const handleOk = () => {
        form.submit();
      }
    
  return (
    <Modal
          title={data ?"Edit Member" : "Add Member"}
          open={open}
          // visible={addMemberModal}
          onOk={handleOk}
          onCancel={onCancel}
          confirmLoading={submitLoader}
        >
            <Form onFinish={handleSubmit} form={form}>
          {/* <Select mode='multiple' options={[{label: 'Member A', value: 'a'}, {label: 'Member B', value: 'b'}]} className='w-100' /> */}
                <Form.Item name="user_id" label="User" rules={[{ required: true, message: 'Please select a user' }]}>
                    <DebounceSelect mode="multiple" value={value} placeholder="Select users" fetchOptions={fetchUserList} onChange={(newValue) => { setValue(newValue as UserValue[]); }} className='w-100' />
                </Form.Item>
            
                <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
                    <Select options={staticRolesOptions} mode='multiple'/>
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
    data?: any
}