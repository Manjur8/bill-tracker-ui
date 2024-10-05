"use client"
import React, { useState } from "react";
import styles from './page.module.css';

import { Button, Flex, Form, Input, InputNumber, message, Typography } from "antd";

import { LockOutlined, PhoneOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
// import { signUpSubmit } from "@/actions/auth-actions";
import { APICall } from "@/utils/ApiCall";

const { Text, Title } = Typography;

const SignUp = () => {
  const router = useRouter();
  const [submitLoader, setSubmitLoader] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const signUpSubmit2 = async (formData: Record<string, unknown>) => {
    setSubmitLoader(true)
    const payload: Record<string, unknown> = {...formData, phone: String(formData.phone), secrets: {password: formData.password}}
    delete payload.confirm_password
    delete payload.password
    

    const resp = await APICall('post', 'PUBLIC_USERS_SIGNUP', payload)
    console.log(resp, 'success')
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
    <section className={styles.section}>
      {contextHolder}
      <div className={styles.container}>
        <Flex className={styles.header} vertical justify="center" align="center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title className={styles.title}>Sign up</Title>
          <Text className={styles.text}>
            Welcome back to Bill Tracker! Please enter your details below to
            register.
          </Text>
        </Flex>
        <Form
          name="sign_up"
          autoComplete={"off"}
          onFinish={signUpSubmit2}
          layout="vertical"
          // requiredMark="optional"
        >
          <Form.Item required name="first_name" label="First Name"
            rules={[
              {
                required: true,
                message: "Please enter your First Name!",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item required
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter your Last Name!",
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item name="user_name" label="Username" required
          rules={[
            {
              required: true,
              message: "Please enter Username!",
            },
          ]}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter your Phone Number!",
              },
            ]}
            >
            <InputNumber className="w-100" controls={false}
              prefix={<PhoneOutlined rotate={90}/>}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item required
            // hasFeedback
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            // hasFeedback
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className={'mb-0'}>
            <Button block={true} type="primary" htmlType="submit" loading={submitLoader} disabled={submitLoader} iconPosition={'end'}>
              Sign up
            </Button>
            <div className={styles.footer}>
              <Text className={styles.text}>Already have an account?</Text>{" "}
              <Button onClick={() => router.push('/auth/sign-in')} type="link" className="p-0">Log in</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default SignUp;