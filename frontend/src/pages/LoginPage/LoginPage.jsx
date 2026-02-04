import React, {useState} from 'react';
import cl from './Loginpage.module.css'
import { Button, Card, Form, Input, Typography } from 'antd';
import { login as loginRequest, register } from '../../api/users.api.js';
import {useAuth} from "../../context/AuthContext.jsx";

const { Title, Text } = Typography;

export const LoginPage = () => {
    const [mode, setMode] = useState('login');
    const { login } = useAuth();

    const onFinish = async (values) => {
        try {
            if (mode === 'login') {
                const res = await loginRequest(values.email, values.password);
                login(res.data.userId);
            } else {
                await register(values.name, values.email, values.password);
                setMode('login');
            }
        } catch (e) {
            console.error(e.response?.data?.error || 'Error');
        }
    };

    return (
        <div className={cl.wrap}>
            <Card className={cl.card}>
                <Title level={3}>
                    {mode === 'login' ? 'Sign in' : 'Sign up'}
                </Title>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    {mode === 'register' && (
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please enter your name' }
                            ]}
                        >
                            <Input placeholder="Your name" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Invalid email format' }
                        ]}
                    >
                        <Input placeholder="email@example.com" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password' }
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            {mode === 'login' ? 'Log in' : 'Register'}
                        </Button>
                    </Form.Item>
                </Form>
                <Form.Item>
                    <Text>
                        {mode === 'login'
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                    </Text>
                    <Button
                        type="link"
                        onClick={() =>
                            setMode(mode === 'login' ? 'register' : 'login')
                        }
                    >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                    </Button>
                </Form.Item>
            </Card>
        </div>
    );
};