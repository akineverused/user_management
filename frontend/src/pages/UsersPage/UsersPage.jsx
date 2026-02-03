import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';

const { Title } = Typography;

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { title: 'Name', dataIndex: 'name'},
        { title: 'Email', dataIndex: 'email'},
        { title: 'Status', dataIndex: 'status'},
        {title: 'Last login', dataIndex: 'last_login'},
    ];

    useEffect(() => {

    }, []);

    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>User management</Title>
            <Space style={{ marginBottom: 16 }}>
                <Button danger disabled={!selectedRowKeys.length}>
                    Block
                </Button>
                <Button disabled={!selectedRowKeys.length}>
                    Unblock
                </Button>
                <Button danger disabled={!selectedRowKeys.length}>
                    Delete
                </Button>
                <Button disabled={!selectedRowKeys.length}>
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

export default UsersPage;