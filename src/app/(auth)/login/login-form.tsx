"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import image from "@/logo/image.png";
import Image from "next/image";
import "@/css/globals.css";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const route = useRouter();
  const onFinish = async (values: any) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Login successful!");
        route.push("/");
      } else {
        message.error("Login failed.");
      }

      return data;
    } catch (error) {
      message.error("Something went wrong. Please try again.");
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
                name="username" // Match this with what you destructure
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
