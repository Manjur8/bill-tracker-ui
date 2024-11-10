import { APICall } from '@/utils/ApiCall';
import { Form, Input, InputNumber, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const AddFlatModal = ({open, handleOk, handleCancel, data}: ModalTypes<null | unknown>) => {
    const [form] = useForm();
    const params = useParams();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleSubmit = async (values: Record<string, unknown>) => {
        setConfirmLoading(true)
        const payload = { ...values, apartment_id: params.id }
        const resp = await APICall('post', 'FLATS', payload);
        if(resp?.success) {
            handleOk()
            message.success(resp?.message)
        } else {
            message.error(resp?.message)
        }
        setConfirmLoading(false)
    }
  return (
    <Modal title="Add Flat" open={open} onOk={form.submit} onCancel={handleCancel} okText={data ? 'Update' : "Save"} confirmLoading={confirmLoading}>
        <Form name="add-apartment-flat" form={form}
            // initialValues={{
            //     remember: true,
            // }}
            onFinish={handleSubmit}
            layout="vertical"
            >
            <Form.Item name="name" label="Flat Name"
                rules={[
                {
                    // type: "email",
                    required: true,
                    message: "Please enter Flat Name",
                },
                ]}
            >
                <Input placeholder="Flat Name"/>
            </Form.Item>
            <Form.Item name="block" label="Block"
                rules={[
                {
                    required: true,
                    message: "Please enter Block",
                },
                ]}
            >
                <Input placeholder="Block"/>
            </Form.Item>
            <Form.Item name="floor" label="Floor"
                rules={[
                {
                    required: true,
                    message: "Please enter Floor",
                },
                ]}
            >
                <InputNumber placeholder="Floor" className='w-100' />
            </Form.Item>
            <Form.Item name="flat_number" label="Flat Number"
                rules={[
                {
                    // type: "email",
                    required: true,
                    message: "Please enter Flat Number",
                },
                ]}
            >
                <Input placeholder="Flat Number"/>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default AddFlatModal

interface ModalTypes<T> {
    open: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    data?: T
}