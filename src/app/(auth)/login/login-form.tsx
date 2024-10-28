"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import image from "@/logo/image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import "@/css/globals.css";

const LoginPage: React.FC = () => {
  const route = useRouter();
  const onFinish = async (values: any) => {
    const { username, password } = values;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      message.error("error");
    } else {
      message.success("success");
      route.push("/home");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex shadow-xl p-3 rounded-xl w-[60%] justify-around">
        <Image src={image} alt="Logo" width={300} height={300} />
        <div className="w-[360px] ml-20">
          <h1 className="text-center mb-5 text-[30px] font-medium">Login</h1>
          <div>
            <Form
              name="login"
              initialValues={{ remember: true }}
              style={{ maxWidth: 360 }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  className="mt-1"
                />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" className="mt-1">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
