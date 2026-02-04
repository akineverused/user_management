import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';
import {getUsers, blockUsers, unblockUsers, deleteUsers, deleteUnverified} from '../../api/users.api.js';
import {useAuth} from "../../context/AuthContext.jsx";

const { Title } = Typography;

export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    const columns = [
        { title: 'Name', dataIndex: 'name'},
        { title: 'Email', dataIndex: 'email'},
        { title: 'Status', dataIndex: 'status'},
        {title: 'Last login', dataIndex: 'last_login'},
    ];

    useEffect(() => {
        void loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch {
            console.error('Failed to load users');
        }
        setLoading(false);
    };

    const onBlock = async () => {
        await blockUsers(selectedRowKeys);
        if (selectedRowKeys.includes(Number(localStorage.getItem('userId')))){
            logout();
        } else await loadUsers();
        console.log('Users blocked');
    };

    const onUnblock = async () => {
        await unblockUsers(selectedRowKeys);
        console.log('Users unblocked');
        await loadUsers();
    };

    const onDelete = async () => {
        await deleteUsers(selectedRowKeys);
        if (selectedRowKeys.includes(Number(localStorage.getItem('userId')))){
            logout();
        } else await loadUsers();
        console.log('Users deleted');
    };
    const onDeleteUnverified = async () => {
        await deleteUnverified();
        if (selectedRowKeys.includes(Number(localStorage.getItem('userId')))){
            logout();
        } else await loadUsers();
        console.log('Unverified users deleted');
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 16
            }}>
                <Title level={3}>User management</Title>
                <Button onClick={logout}>
                    Logout
                </Button>
            </div>

            <Space style={{ marginBottom: 16 }}>
                <Button
                    danger
                    onClick={onBlock}
                    disabled={!selectedRowKeys.length}
                >
                    Block
                </Button>
                <Button
                    onClick={onUnblock}
                    disabled={!selectedRowKeys.length}
                >
                    Unblock
                </Button>
                <Button
                    danger
                    onClick={onDelete}
                    disabled={!selectedRowKeys.length}
                >
                    Delete
                </Button>
                <Button
                    disabled={!selectedRowKeys.length}
                    onClick={onDeleteUnverified}
                >
                    Delete unverified
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={users}
                loading={loading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys
                }}
                columns={columns}
            />
        </div>
    );
};