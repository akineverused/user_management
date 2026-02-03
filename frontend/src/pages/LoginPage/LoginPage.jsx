import React, {useState} from 'react';
import cl from './Loginpage.module.css'
import { Button, Card, Form, Input, Typography } from 'antd';

const { Title, Text } = Typography;

const LoginPage = () => {
    const [mode, setMode] = useState('login');

    const onFinish = (values) => {
        if (mode === 'login') {
            console.log('LOGIN:', values);
        } else {
            console.log('REGISTER:', values);
        }
    };

    return (
        <div className={cl.wrap}>
            <Card className={cl.card}>
                <Title level={3} style={{ textAlign: 'center' }}>
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
                <Form.Item style={{ marginBottom: 0 }}>
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

export default LoginPage;