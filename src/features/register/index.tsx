"use client"
import { useSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { APICall } from '@/utils/ApiCall';
import { Button, Form, Input, InputNumber, message, Space } from 'antd'
import React, { useState } from 'react'

const Register = () => {
    const userInfo = useSelector((state: RootState) => state.userInfo)
    const [messageApi, contextHolder] = message.useMessage();

    const [submitLoader, setSubmitLoader] = useState(false);

    const handleSubmit = async (values: Record<string, unknown>) => {

        setSubmitLoader(true)
        const payload = {
            name: values?.name,
            address: {
                city_village: values?.city_village,
                country: values?.country,
                locality: values?.locality,
                pincode: values?.pincode
            },
            members: [
                {
                    user_id: userInfo.user_id,
                    role: ["APPRESIDENT"]
                }
            ]
        }

        const resp = await APICall('post', 'APPARTMENT_REGISTER', payload)

        if(resp?.success) {
            messageApi.open({
                type: 'success',
                content: resp?.message
              })
        } else {
            messageApi.open({
                type: 'error',
                content: resp?.message
              })
        }
        setSubmitLoader(false)
    }

  return (
    <div>
        {contextHolder}
        <Space
            className='bg-white p-16'
            direction="vertical"
            size="middle"
            style={{
            display: 'flex',
            }}
        >
            <Form
            name="normal_login"
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark="optional"
            >
            <Form.Item
                name="name"
                label="Appartment Name"
                rules={[
                {
                    // type: "email",
                    required: true,
                    message: "Please input your Phone Number!",
                },
                ]}
            >
                <Input
                //   prefix={<PhoneOutlined rotate={90} />}
                placeholder="Appartment Name"
                />
            </Form.Item>
            <Form.Item
                name="address"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Password!",
                //   },
                // ]}
            >
                <Form.Item
                    name="city_village"
                    label="City/Village"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Country!",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="pincode"
                    label="Pin Code"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Pin Code!",
                    },
                    ]}
                >
                    <InputNumber style={{width: '100%'}} />
                </Form.Item>
                <Form.Item
                    name="locality"
                    label="Locality"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Locality Name!",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form.Item>
            <Form.Item className={'mb-0'}>
                <Button block={true} type="primary" loading={submitLoader} disabled={submitLoader} iconPosition={'end'} htmlType="submit">
                Register Appartment
                </Button>
            </Form.Item>
            </Form>
        </Space>
    </div>
  )
}

export default Register