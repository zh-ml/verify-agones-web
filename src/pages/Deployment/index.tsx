import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Steps, Button, Form, Select, InputNumber, Radio, Card, Row, Col, Divider, Alert, Spin, Result, Input } from 'antd';
import { RocketOutlined, SettingOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const DeploymentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const StepsContainer = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const StepContent = styled.div`
  margin-top: ${theme.space.xl};
  min-height: 300px;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PriceCard = styled(Card)`
  position: sticky;
  top: 100px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.space.sm};
`;

const TotalRow = styled(PriceRow)`
  font-weight: bold;
  font-size: ${theme.fontSizes.lg};
  margin-top: ${theme.space.md};
  padding-top: ${theme.space.md};
  border-top: 1px solid ${theme.colors.border};
`;

const GameInfoCard = styled(Card)`
  margin-bottom: ${theme.space.xl};
  display: flex;
  align-items: center;
`;

const GameImage = styled.img`
  width: 120px;
  height: 70px;
  object-fit: cover;
  border-radius: ${theme.radii.md};
  margin-right: ${theme.space.md};
`;

const GameInfo = styled.div`
  flex: 1;
`;

const GameTitle = styled.h3`
  margin: 0 0 ${theme.space.xs} 0;
`;

const GameMeta = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: ${theme.space.xl} 0;
`;

// 模拟游戏数据
const gameData = {
  id: '1',
  title: 'Minecraft',
  imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023-Trails_and_Tales_1170x500.jpg',
  developer: 'Mojang Studios',
  versions: [
    { value: 'vanilla-1.20.4', label: 'Vanilla 1.20.4' },
    { value: 'vanilla-1.19.4', label: 'Vanilla 1.19.4' },
    { value: 'vanilla-1.18.2', label: 'Vanilla 1.18.2' },
    { value: 'paper-1.20.4', label: 'Paper 1.20.4' },
    { value: 'paper-1.19.4', label: 'Paper 1.19.4' },
    { value: 'spigot-1.20.4', label: 'Spigot 1.20.4' },
    { value: 'forge-1.20.1', label: 'Forge 1.20.1' },
    { value: 'fabric-1.20.1', label: 'Fabric 1.20.1' },
  ],
  deploymentOptions: [
    { name: '基础版', cpu: '2核', memory: '4GB', storage: '50GB', price: 20 },
    { name: '标准版', cpu: '4核', memory: '8GB', storage: '100GB', price: 40 },
    { name: '高级版', cpu: '8核', memory: '16GB', storage: '200GB', price: 80 },
  ],
};

const DeploymentPage: React.FC = () => {
  // 使用id参数来获取游戏信息（在实际应用中）
  const { id: _id } = useParams<{ id: string }>(); // 使用下划线前缀忽略未使用的变量
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  // 在实际应用中，这些状态会用于UI渲染
  const [_deploymentSuccess, setDeploymentSuccess] = useState(false); // 使用下划线前缀忽略未使用的变量
  const [deploymentId, setDeploymentId] = useState('');
  
  // 检查是否从购物车支付成功后跳转过来
  const fromPayment = location.state?.fromPayment === true;
  
  // 获取URL中的plan参数
  const planIndex = searchParams.get('plan');
  
  useEffect(() => {
    // 如果URL中有plan参数，则设置初始值
    if (planIndex !== null) {
      const plan = parseInt(planIndex);
      if (!isNaN(plan) && plan >= 0 && plan < gameData.deploymentOptions.length) {
        form.setFieldsValue({
          plan: plan,
        });
      }
    }
    
    // 如果是从购物车支付成功后跳转过来，自动填充表单并进入部署流程
    if (fromPayment) {
      // 设置默认值
      form.setFieldsValue({
        version: gameData.versions[0].value,
        plan: 0,
        serverName: `${gameData.title} 服务器`,
        maxPlayers: 10,
        gameMode: 'survival',
        difficulty: 'normal',
        enablePVP: true,
        serverDescription: '这是我的游戏服务器'
      });
      
      // 直接跳到最后一步，模拟部署成功
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDeploymentSuccess(true);
        setDeploymentId(`MC-${Math.floor(Math.random() * 10000)}`);
        setCurrentStep(3); // 直接跳到成功页面
      }, 2000);
    }
  }, [planIndex, form, fromPayment, gameData]);
  
  const handleNext = () => {
    if (currentStep === 0) {
      form.validateFields(['version', 'plan']).then(() => {
        setCurrentStep(currentStep + 1);
      });
    } else if (currentStep === 1) {
      form.validateFields(['serverName', 'maxPlayers']).then(() => {
        setCurrentStep(currentStep + 1);
      });
    } else if (currentStep === 2) {
      // 支付确认步骤
      setLoading(true);
      // 模拟API调用
      setTimeout(() => {
        setLoading(false);
        setDeploymentSuccess(true);
        setDeploymentId(`MC-${Math.floor(Math.random() * 10000)}`); // 生成随机ID
        setCurrentStep(currentStep + 1);
      }, 2000);
    }
  };
  
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };
  
  // 计算价格
  const calculatePrice = () => {
    const values = form.getFieldsValue();
    const planIndex = values.plan !== undefined ? values.plan : 0;
    const basePrice = gameData.deploymentOptions[planIndex]?.price || 0;
    
    return {
      basePrice,
      total: basePrice,
    };
  };
  
  const prices = calculatePrice();
  
  const steps = [
    {
      title: '选择配置',
      icon: <SettingOutlined />,
      content: (
        <FormContainer>
          <Form.Item name="version" label="游戏版本" rules={[{ required: true, message: '请选择游戏版本' }]}>
            <Select placeholder="选择游戏版本">
              {gameData.versions.map(version => (
                <Select.Option key={version.value} value={version.value}>
                  {version.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="plan" label="服务器配置" rules={[{ required: true, message: '请选择服务器配置' }]}>
            <Radio.Group>
              {gameData.deploymentOptions.map((option, index) => (
                <Radio.Button value={index} key={index}>
                  {option.name} ({option.cpu}/{option.memory})
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          
          <Alert 
            message="配置说明" 
            description={
              <>
                <p><strong>基础版：</strong> 适合小型服务器，支持5-10名玩家同时在线。</p>
                <p><strong>标准版：</strong> 适合中型服务器，支持10-25名玩家同时在线。</p>
                <p><strong>高级版：</strong> 适合大型服务器，支持25-50名玩家同时在线。</p>
              </>
            } 
            type="info" 
            showIcon 
          />
        </FormContainer>
      ),
    },
    {
      title: '服务器设置',
      icon: <SettingOutlined />,
      content: (
        <FormContainer>
          <Form.Item name="serverName" label="服务器名称" rules={[{ required: true, message: '请输入服务器名称' }]}>
            <Input placeholder="输入服务器名称" />
          </Form.Item>
          
          <Form.Item name="maxPlayers" label="最大玩家数" rules={[{ required: true, message: '请输入最大玩家数' }]}>
            <InputNumber min={1} max={100} placeholder="最大玩家数" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item name="serverDescription" label="服务器描述">
            <TextArea rows={4} placeholder="输入服务器描述（可选）" />
          </Form.Item>
          
          <Form.Item name="gameMode" label="游戏模式" initialValue="survival">
            <Select>
              <Select.Option value="survival">生存模式</Select.Option>
              <Select.Option value="creative">创造模式</Select.Option>
              <Select.Option value="adventure">冒险模式</Select.Option>
              <Select.Option value="spectator">旁观者模式</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="difficulty" label="游戏难度" initialValue="normal">
            <Select>
              <Select.Option value="peaceful">和平</Select.Option>
              <Select.Option value="easy">简单</Select.Option>
              <Select.Option value="normal">普通</Select.Option>
              <Select.Option value="hard">困难</Select.Option>
            </Select>
          </Form.Item>
        </FormContainer>
      ),
    },
    {
      title: '确认支付',
      icon: <CreditCardOutlined />,
      content: (
        <FormContainer>
          <Alert
            message="确认部署信息"
            description="请确认以下部署信息无误，点击'确认部署'按钮后将开始创建您的游戏服务器。"
            type="info"
            showIcon
            style={{ marginBottom: theme.space.lg }}
          />
          
          <Card title="部署信息摘要">
            <p><strong>游戏：</strong> {gameData.title}</p>
            <p><strong>版本：</strong> {form.getFieldValue('version') ? gameData.versions.find(v => v.value === form.getFieldValue('version'))?.label : '未选择'}</p>
            <p><strong>服务器名称：</strong> {form.getFieldValue('serverName') || '未设置'}</p>
            <p><strong>最大玩家数：</strong> {form.getFieldValue('maxPlayers') || '未设置'}</p>
            <p><strong>游戏模式：</strong> {form.getFieldValue('gameMode') === 'survival' ? '生存模式' : 
                                    form.getFieldValue('gameMode') === 'creative' ? '创造模式' : 
                                    form.getFieldValue('gameMode') === 'adventure' ? '冒险模式' : '旁观者模式'}</p>
            <p><strong>游戏难度：</strong> {form.getFieldValue('difficulty') === 'peaceful' ? '和平' : 
                                    form.getFieldValue('difficulty') === 'easy' ? '简单' : 
                                    form.getFieldValue('difficulty') === 'normal' ? '普通' : '困难'}</p>
            <Divider />
            <p><strong>服务器配置：</strong> {gameData.deploymentOptions[form.getFieldValue('plan') || 0].name}</p>
            <p><strong>CPU：</strong> {gameData.deploymentOptions[form.getFieldValue('plan') || 0].cpu}</p>
            <p><strong>内存：</strong> {gameData.deploymentOptions[form.getFieldValue('plan') || 0].memory}</p>
            <p><strong>存储：</strong> {gameData.deploymentOptions[form.getFieldValue('plan') || 0].storage}</p>
          </Card>
        </FormContainer>
      ),
    },
    {
      title: '部署完成',
      icon: <CheckCircleOutlined />,
      content: (
        <SuccessContainer>
          <Result
            status="success"
            title="服务器部署成功！"
            subTitle={`服务器ID: ${deploymentId}`}
            extra={[
              <Button type="primary" key="dashboard" onClick={handleFinish}>
                前往控制台
              </Button>,
            ]}
          />
          <Alert
            message="服务器正在初始化"
            description="您的游戏服务器正在初始化中，这可能需要几分钟时间。您可以在控制台查看服务器状态和详细信息。"
            type="info"
            showIcon
            style={{ maxWidth: '600px', margin: '0 auto', marginTop: theme.space.xl }}
          />
        </SuccessContainer>
      ),
    },
  ];
  
  return (
    <DeploymentContainer>
      <GameInfoCard>
        <GameImage src={gameData.imageUrl} alt={gameData.title} />
        <GameInfo>
          <GameTitle>{gameData.title}</GameTitle>
          <GameMeta>开发商: {gameData.developer}</GameMeta>
        </GameInfo>
      </GameInfoCard>
      
      <StepsContainer>
        <Steps
          current={currentStep}
          items={steps.map(item => ({
            title: item.title,
            icon: item.icon,
          }))}
        />
      </StepsContainer>
      
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Form form={form} layout="vertical" initialValues={{ plan: planIndex ? parseInt(planIndex) : 0 }}>
            <StepContent>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                  <Spin size="large" />
                  <p style={{ marginTop: theme.space.md }}>正在处理您的部署请求...</p>
                </div>
              ) : (
                steps[currentStep].content
              )}
            </StepContent>
          </Form>
        </Col>
        
        <Col xs={24} md={8}>
          <PriceCard title="费用明细">
            <PriceRow>
              <span>基础服务费</span>
              <span>¥{prices.basePrice}/月</span>
            </PriceRow>
            <TotalRow>
              <span>总计</span>
              <span>¥{prices.total}/月</span>
            </TotalRow>
            
            <Divider />
            
            <div style={{ textAlign: 'center' }}>
              {currentStep < steps.length - 1 && (
                <Button 
                  type="primary" 
                  onClick={handleNext} 
                  style={{ marginRight: theme.space.sm }}
                  loading={loading}
                  icon={currentStep === 2 ? <RocketOutlined /> : undefined}
                >
                  {currentStep === 0 ? '下一步' : currentStep === 1 ? '下一步' : '确认部署'}
                </Button>
              )}
              
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button onClick={handlePrev} disabled={loading}>
                  上一步
                </Button>
              )}
            </div>
          </PriceCard>
        </Col>
      </Row>
    </DeploymentContainer>
  );
};

// 自定义样式组件已移除，使用antd的Input组件

export default DeploymentPage;