"use client"
import React, { useState } from "react";
import Image from 'next/image';
// import json from "@/utils/cookies/DummyResponses.json"

import styles from './page.module.css';

import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";

import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { APICall } from "@/utils/ApiCall";
import { setCookies } from "@/utils/cookies";
import { App_Name, Logo2 } from "@/contants/AppConstant";
import { setUserInfo } from "@/utils/slices/userInfo";
import { useDispatch } from "@/lib/hooks";

const { Text, Title } = Typography;

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
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
    const resp = await APICall<{result: {token: string, first_name: string, last_name: string, user_id: string, apartment_access: boolean, flat_access: boolean }}>('post', 'PUBLIC_USERS_SIGNIN',  values)
    // const resp = json;

    if(resp?.success) {
      const result = resp?.data?.result
      dispatch(setUserInfo({first_name: result?.first_name, last_name: result?.last_name, user_id: result?.user_id, apartment_access: result?.apartment_access, flat_access: result?.flat_access}))
      await setCookies('auth-token', resp?.data?.result?.token)
      // await setCookies('user-info', JSON.stringify({first_name: resp?.data?.result?.first_name, last_name: resp?.data?.result?.last_name}))
      if(result?.apartment_access && result?.flat_access) {
        // ======last vistited route from redux and redirect to the router ======


        // =====if no last visited route====
        router.push('/appartment')
      } else if (result?.apartment_access) {
        router.push('/appartment')
      } else if (result?.flat_access) {
        router.push('/flat')
      } else {
        router.push('/register')
      }
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
          <Image src={Logo2} alt="image" width={25} height={24} />          

          <Title className={styles.title}>Sign in</Title>
          <Text className={styles.text}>
            Welcome to {App_Name}! Please fill the details below to log in.
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