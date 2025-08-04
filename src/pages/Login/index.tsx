import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, Divider, Space, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.secondary}15 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.space.lg};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.lg};
  border-radius: ${theme.radii.lg};
  
  .ant-card-body {
    padding: ${theme.space.xl};
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${theme.space.xl};
  
  h1 {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${theme.colors.primary};
    margin: 0;
  }
  
  p {
    color: ${theme.colors.text.secondary};
    margin: ${theme.space.xs} 0 0 0;
  }
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: ${theme.space.lg};
  }
  
  .ant-input-affix-wrapper {
    padding: ${theme.space.sm} ${theme.space.md};
    border-radius: ${theme.radii.md};
  }
  
  .ant-btn {
    height: 44px;
    border-radius: ${theme.radii.md};
    font-weight: 600;
  }
`;

const TabsContainer = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: ${theme.space.lg};
  }
  
  .ant-tabs-tab {
    font-weight: 600;
  }
`;

const FooterLinks = styled.div`
  text-align: center;
  margin-top: ${theme.space.lg};
  
  a {
    color: ${theme.colors.text.secondary};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const DemoCredentials = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.space.md};
  border-radius: ${theme.radii.md};
  margin-bottom: ${theme.space.lg};
  font-size: ${theme.fontSizes.sm};
  
  h4 {
    margin: 0 0 ${theme.space.xs} 0;
    color: ${theme.colors.text.primary};
  }
  
  p {
    margin: 0;
    color: ${theme.colors.text.secondary};
  }
`;



const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = async (values: any) => {
    setLoginLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        navigate(from, { replace: true });
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (values: any) => {
    setRegisterLoading(true);
    try {
      const success = await register(values.username, values.email, values.password);
      if (success) {
        navigate(from, { replace: true });
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'user') => {
    const credentials = {
      admin: { email: 'admin@theninth.com', password: 'admin123' },
      user: { email: 'user@example.com', password: 'user123' }
    };
    
    // 这里需要通过form实例来设置值
    const form = document.querySelector('form');
    if (form) {
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
      const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement;
      
      if (emailInput && passwordInput) {
        emailInput.value = credentials[type].email;
        passwordInput.value = credentials[type].password;
        
        // 触发change事件以更新form状态
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  const loginForm = (
    <StyledForm
      name="login"
      onFinish={handleLogin}
      autoComplete="off"
      size="large"
    >
      <DemoCredentials>
        <h4>演示账号</h4>
        <p>管理员: admin@theninth.com / admin123</p>
        <p>普通用户: user@example.com / user123</p>
        <Space style={{ marginTop: theme.space.xs }}>
          <Button size="small" onClick={() => fillDemoCredentials('admin')}>填入管理员</Button>
          <Button size="small" onClick={() => fillDemoCredentials('user')}>填入用户</Button>
        </Space>
      </DemoCredentials>
      
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="邮箱地址"
          type="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Link to="/forgot-password">忘记密码？</Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loginLoading}
          block
        >
          登录
        </Button>
      </Form.Item>
    </StyledForm>
  );

  const registerForm = (
    <StyledForm
      name="register"
      onFinish={handleRegister}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名最多20个字符' }
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="用户名"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="邮箱地址"
          type="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6个字符' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="确认密码"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        name="agree"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('请同意服务条款')),
          },
        ]}
      >
        <Checkbox>
          我已阅读并同意 <Link to="/terms">服务条款</Link> 和 <Link to="/privacy">隐私政策</Link>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={registerLoading}
          block
        >
          注册
        </Button>
      </Form.Item>
    </StyledForm>
  );

  const tabItems = [
    {
      key: 'login',
      label: '登录',
      children: loginForm,
    },
    {
      key: 'register',
      label: '注册',
      children: registerForm,
    },
  ];

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>TheNinth</h1>
          <p>专业的游戏服务器部署平台</p>
        </Logo>
        
        <TabsContainer
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          centered
        />
        
        <Divider />
        
        <FooterLinks>
          <Link to="/">返回首页</Link>
          <span style={{ margin: '0 16px', color: theme.colors.text.secondary }}>|</span>
          <Link to="/contact">联系我们</Link>
        </FooterLinks>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;