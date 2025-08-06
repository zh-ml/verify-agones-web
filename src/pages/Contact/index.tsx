import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Row, Col, Form, Input, Button, message, Card } from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

// 样式组件
const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.md};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto ${theme.space.xl};
  line-height: 1.6;
  text-align: center;
`;

const ContactFormContainer = styled.div`
  background-color: ${theme.colors.card};
  padding: ${theme.space.xl};
  border-radius: ${theme.radii.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: ${theme.space.xl};
`;

const FormTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.lg};
`;

const ContactInfoCard = styled(Card)`
  height: 100%;
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ContactIconWrapper = styled.div`
  font-size: 36px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
  display: flex;
  justify-content: center;
`;

const ContactInfoTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.sm};
  text-align: center;
`;

const ContactInfoText = styled.p`
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;
`;

const MapContainer = styled.div`
  margin-top: ${theme.space.xl};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  height: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (_values: any) => {
    setSubmitting(true);
    
    // 模拟提交表单
    setTimeout(() => {
      message.success('您的消息已成功发送，我们将尽快与您联系！');
      form.resetFields();
      setSubmitting(false);
    }, 1500);
  };
  
  return (
    <ContactContainer>
      <PageTitle>联系我们</PageTitle>
      <Subtitle>
        无论您有任何问题、建议或合作意向，我们都很乐意听取。请通过以下方式与我们取得联系。
      </Subtitle>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <ContactFormContainer>
            <FormTitle>发送消息</FormTitle>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入您的姓名' }]}
                  >
                    <Input size="large" placeholder="请输入您的姓名" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="电子邮箱"
                    rules={[
                      { required: true, message: '请输入您的电子邮箱' },
                      { type: 'email', message: '请输入有效的电子邮箱' }
                    ]}
                  >
                    <Input size="large" placeholder="请输入您的电子邮箱" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="subject"
                label="主题"
                rules={[{ required: true, message: '请输入消息主题' }]}
              >
                <Input size="large" placeholder="请输入消息主题" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="消息内容"
                rules={[{ required: true, message: '请输入消息内容' }]}
              >
                <TextArea 
                  rows={6} 
                  placeholder="请详细描述您的问题或需求" 
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  loading={submitting}
                  block
                >
                  发送消息
                </Button>
              </Form.Item>
            </Form>
          </ContactFormContainer>
        </Col>
        
        <Col xs={24} md={8}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <ContactInfoCard>
                <ContactIconWrapper>
                  <MailOutlined />
                </ContactIconWrapper>
                <ContactInfoTitle>电子邮箱</ContactInfoTitle>
                <ContactInfoText>support@theninth.com</ContactInfoText>
                <ContactInfoText>business@theninth.com</ContactInfoText>
              </ContactInfoCard>
            </Col>
            
            <Col span={24}>
              <ContactInfoCard>
                <ContactIconWrapper>
                  <PhoneOutlined />
                </ContactIconWrapper>
                <ContactInfoTitle>电话</ContactInfoTitle>
                <ContactInfoText>+86 400-123-4567</ContactInfoText>
                <ContactInfoText>周一至周五 9:00-18:00</ContactInfoText>
              </ContactInfoCard>
            </Col>
            
            <Col span={24}>
              <ContactInfoCard>
                <ContactIconWrapper>
                  <GlobalOutlined />
                </ContactIconWrapper>
                <ContactInfoTitle>社交媒体</ContactInfoTitle>
                <ContactInfoText>
                  微信公众号：TheNinth游戏
                </ContactInfoText>
                <ContactInfoText>
                  微博：@TheNinth官方
                </ContactInfoText>
              </ContactInfoCard>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <MapContainer>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9259798932!2d114.05793707596853!3d22.52473397953865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f5c1eea7fd59%3A0xbc0d9411c29c8346!2z6YeR6JuL6L2v5Lu25bel56iL5Zut!5e0!3m2!1szh-CN!2scn!4v1699012345678!5m2!1szh-CN!2scn" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="TheNinth办公地址"
        />
      </MapContainer>
    </ContactContainer>
  );
};

export default ContactPage;