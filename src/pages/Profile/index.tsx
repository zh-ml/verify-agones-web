import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Tabs, Form, Input, Button, Upload, Avatar, Card, Row, Col, Divider, Switch, Alert, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CreditCardOutlined, BellOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const ProfileHeader = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const ProfileTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.space.md};
`;

const FormContainer = styled.div`
  max-width: 600px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.space.xl};
`;

const UserAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: ${theme.space.md};
`;

const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.space.md};
`;

const PaymentMethodCard = styled(Card)`
  margin-bottom: ${theme.space.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast} ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
  
  &.selected {
    border-color: ${theme.colors.primary};
    background-color: rgba(79, 70, 229, 0.05);
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardIcon = styled.div`
  font-size: 24px;
  margin-right: ${theme.space.md};
`;

const CardDetails = styled.div`
  flex: 1;
`;

const CardNumber = styled.div`
  font-family: ${theme.fonts.monospace};
`;

const CardMeta = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.space.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  font-weight: 500;
`;

const NotificationDescription = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.space.xs};
`;

// 模拟用户数据
const userData = {
  id: 'user-001',
  username: 'gamer123',
  email: 'user@example.com',
  name: '张三',
  avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  phone: '13800138000',
  createdAt: '2023-01-15',
  paymentMethods: [
    {
      id: 'pm-001',
      type: 'credit',
      cardNumber: '**** **** **** 4242',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: 'pm-002',
      type: 'debit',
      cardNumber: '**** **** **** 5678',
      expiryDate: '09/24',
      isDefault: false,
    },
  ],
  notifications: {
    emailNotifications: true,
    serverAlerts: true,
    marketingEmails: false,
    billingReminders: true,
    securityAlerts: true,
  },
};

const ProfilePage: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [billingForm] = Form.useForm();
  
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(userData.paymentMethods[0].id);
  const [notifications, setNotifications] = useState(userData.notifications);
  
  const handleProfileSubmit = (values: any) => {
    console.log('个人资料更新:', values);
    message.success('个人资料已更新');
    // 这里可以实现更新个人资料的API调用
  };
  
  const handlePasswordSubmit = (values: any) => {
    console.log('密码更新:', values);
    message.success('密码已更新');
    passwordForm.resetFields();
    // 这里可以实现更新密码的API调用
  };
  
  const handleBillingSubmit = (values: any) => {
    console.log('账单信息更新:', values);
    message.success('账单信息已更新');
    // 这里可以实现更新账单信息的API调用
  };
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
    message.success('通知设置已更新');
    // 这里可以实现更新通知设置的API调用
  };
  
  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          个人资料
        </span>
      ),
      children: (
        <FormContainer>
          <AvatarContainer>
            <UserAvatar src={userData.avatar} size={100} />
            <Upload
              fileList={fileList}
              onChange={handleUploadChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </AvatarContainer>
          
          <Form
            form={profileForm}
            layout="vertical"
            initialValues={{
              username: userData.username,
              email: userData.email,
              name: userData.name,
              phone: userData.phone,
            }}
            onFinish={handleProfileSubmit}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="电子邮箱"
              rules={[
                { required: true, message: '请输入电子邮箱' },
                { type: 'email', message: '请输入有效的电子邮箱' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="电子邮箱" />
            </Form.Item>
            
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="姓名" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="手机号码"
              rules={[{ required: true, message: '请输入手机号码' }]}
            >
              <Input placeholder="手机号码" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                保存更改
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <LockOutlined />
          安全设置
        </span>
      ),
      children: (
        <FormContainer>
          <CardTitle>修改密码</CardTitle>
          
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
          >
            <Form.Item
              name="currentPassword"
              label="当前密码"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="当前密码" />
            </Form.Item>
            
            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 8, message: '密码长度不能少于8个字符' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              label="确认新密码"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="确认新密码" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新密码
              </Button>
            </Form.Item>
          </Form>
          
          <Divider />
          
          <CardTitle>两步验证</CardTitle>
          
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>两步验证</h4>
                <p style={{ color: theme.colors.text.secondary }}>启用两步验证以增强账户安全性</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </Card>
        </FormContainer>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <CreditCardOutlined />
          账单与支付
        </span>
      ),
      children: (
        <FormContainer>
          <CardTitle>支付方式</CardTitle>
          
          {userData.paymentMethods.map(method => (
            <PaymentMethodCard 
              key={method.id} 
              className={selectedPaymentMethod === method.id ? 'selected' : ''}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <CardInfo>
                <CardIcon>
                  {method.type === 'credit' ? 
                    <i className="fa fa-credit-card" /> : 
                    <i className="fa fa-credit-card" />}
                </CardIcon>
                <CardDetails>
                  <CardNumber>{method.cardNumber}</CardNumber>
                  <CardMeta>
                    到期日: {method.expiryDate} {method.isDefault && ' (默认)'}
                  </CardMeta>
                </CardDetails>
              </CardInfo>
            </PaymentMethodCard>
          ))}
          
          <Button type="dashed" style={{ width: '100%', marginBottom: theme.space.xl }}>
            添加新支付方式
          </Button>
          
          <Divider />
          
          <CardTitle>账单地址</CardTitle>
          
          <Form
            form={billingForm}
            layout="vertical"
            initialValues={{
              country: 'China',
              province: '广东省',
              city: '深圳市',
              address: '南山区科技园',
              zipCode: '518000',
            }}
            onFinish={handleBillingSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="国家/地区"
                  rules={[{ required: true, message: '请选择国家/地区' }]}
                >
                  <Input placeholder="国家/地区" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="province"
                  label="省/州"
                  rules={[{ required: true, message: '请输入省/州' }]}
                >
                  <Input placeholder="省/州" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="城市"
                  rules={[{ required: true, message: '请输入城市' }]}
                >
                  <Input placeholder="城市" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="zipCode"
                  label="邮政编码"
                  rules={[{ required: true, message: '请输入邮政编码' }]}
                >
                  <Input placeholder="邮政编码" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="address"
              label="详细地址"
              rules={[{ required: true, message: '请输入详细地址' }]}
            >
              <Input placeholder="详细地址" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存地址
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <BellOutlined />
          通知设置
        </span>
      ),
      children: (
        <FormContainer>
          <Alert
            message="通知设置"
            description="您可以自定义接收哪些类型的通知，以及如何接收这些通知。"
            type="info"
            showIcon
            style={{ marginBottom: theme.space.xl }}
          />
          
          <Card>
            <NotificationItem>
              <div>
                <NotificationTitle>电子邮件通知</NotificationTitle>
                <NotificationDescription>接收有关账户活动的电子邮件通知</NotificationDescription>
              </div>
              <Switch 
                checked={notifications.emailNotifications} 
                onChange={(checked) => handleNotificationChange('emailNotifications', checked)} 
              />
            </NotificationItem>
            
            <NotificationItem>
              <div>
                <NotificationTitle>服务器状态提醒</NotificationTitle>
                <NotificationDescription>当您的服务器状态发生变化时接收通知</NotificationDescription>
              </div>
              <Switch 
                checked={notifications.serverAlerts} 
                onChange={(checked) => handleNotificationChange('serverAlerts', checked)} 
              />
            </NotificationItem>
            
            <NotificationItem>
              <div>
                <NotificationTitle>营销邮件</NotificationTitle>
                <NotificationDescription>接收有关新功能、优惠和促销的电子邮件</NotificationDescription>
              </div>
              <Switch 
                checked={notifications.marketingEmails} 
                onChange={(checked) => handleNotificationChange('marketingEmails', checked)} 
              />
            </NotificationItem>
            
            <NotificationItem>
              <div>
                <NotificationTitle>账单提醒</NotificationTitle>
                <NotificationDescription>接收有关账单和付款的提醒</NotificationDescription>
              </div>
              <Switch 
                checked={notifications.billingReminders} 
                onChange={(checked) => handleNotificationChange('billingReminders', checked)} 
              />
            </NotificationItem>
            
            <NotificationItem>
              <div>
                <NotificationTitle>安全提醒</NotificationTitle>
                <NotificationDescription>接收有关账户安全的重要提醒</NotificationDescription>
              </div>
              <Switch 
                checked={notifications.securityAlerts} 
                onChange={(checked) => handleNotificationChange('securityAlerts', checked)} 
              />
            </NotificationItem>
          </Card>
        </FormContainer>
      ),
    },
  ];
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>个人资料</ProfileTitle>
      </ProfileHeader>
      
      <Tabs defaultActiveKey="1" items={items} />
    </ProfileContainer>
  );
};

export default ProfilePage;