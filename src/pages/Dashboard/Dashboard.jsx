import React from 'react';
import { Card, Statistic } from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
      <Card style={{ width: 300 }}>
        <Statistic
          title="Mahsulotlar soni"
          value={120}
          prefix={<ShoppingOutlined />}
        />
      </Card>
      <Card style={{ width: 300 }}>
        <Statistic
          title="Foydalanuvchilar"
          value={86}
          prefix={<UserOutlined />}
        />
      </Card>
      <Card style={{ width: 300 }}>
        <Statistic
          title="Umumiy savdo"
          value={95000000}
          prefix={<DollarCircleOutlined />}
          suffix="UZS"
        />
      </Card>
    </div>
  );
};

export default Dashboard;