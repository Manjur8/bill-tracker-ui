"use client"
import React, { useState } from "react";

import styles from './page.module.css';

import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";

import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { APICall } from "@/utils/ApiCall";
import { setCookies } from "@/utils/cookies";

const { Text, Title } = Typography;

export default function SignIn() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitLoader, setSubmitLoader] = useState(false)

  //   container: {
  //     margin: "0 auto",
  //     padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
  //     width: "380px",
      
  //   },
  //   footer: {
  //         marginTop: token.marginLG,
  //     textAlign: "center",
  //     width: "100%"
  //   },
  //   forgotPassword: {
  //       float: "right"
  //   },
  //   header: {
  //         marginBottom: token.marginXL
  //   },
  //   section: {
  //     minHeight: '100svh',
  //     alignItems: "center",
  //     backgroundColor: token.colorBgContainer,
  //     display: "flex",
  //     height: screens.sm ? "100vh" : "auto",
  //     padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
  //   },
  //   text: {
  //     color: token.colorTextSecondary
  //   },
  //   title: {
  //     fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
  //   }
  // };

  const handleSubmit = async(values: Record<string, unknown>) => {
    setSubmitLoader(true)
    const resp = await APICall<{result: {token: string, first_name: string, last_name: string}}>('post', 'PUBLIC_USERS_SIGNIN',  values)

    if(resp?.success) {
      messageApi.open({
        type: 'success',
        content: resp?.message
      })
      await setCookies('auth-token', resp?.data?.result?.token)
      await setCookies('user-info', JSON.stringify({first_name: resp?.data?.result?.first_name, last_name: resp?.data?.result?.last_name}))
      router.push('/')
    } else {
      messageApi.open({
        type: 'error',
        content: resp?.message
      })
      setSubmitLoader(false)
    }
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

          <Title className={styles.title}>Sign in</Title>
          <Text className={styles.text}>
            Welcome to Bill Tracker! Please fill the details below to log in.
          </Text>
        </Flex>
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
            name="contact"
            rules={[
              {
                // type: "email",
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined rotate={90} />}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item valuePropName="checked" noStyle>
              <Checkbox defaultChecked>Remember me</Checkbox>
            </Form.Item>
            <a className={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item className={'mb-o'}>
            <Button block={true} type="primary" loading={submitLoader} disabled={submitLoader} iconPosition={'end'} htmlType="submit">
              Log in
            </Button>
            <div className={styles.footer}>
              <Text className={styles.text}>Don&apos;t have an account?</Text>{" "}
              <Button onClick={() => router.push('/auth/sign-up')} type="link" className="p-0">Sign up now</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}