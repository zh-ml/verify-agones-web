import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Form, Slider, Card, Row, Col, Divider, Alert, Typography, Switch } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CustomizationContainer = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const OptionCard = styled(Card)`
  margin-bottom: ${theme.space.md};
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PriceTag = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-top: ${theme.space.md};
`;

const SliderContainer = styled.div`
  padding: 0 ${theme.space.md};
  margin-bottom: ${theme.space.lg};
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.space.xs};
`;

const SliderValue = styled.div`
  text-align: center;
  margin-top: ${theme.space.xs};
  font-weight: bold;
`;

interface CustomDeploymentProps {
  onConfigChange: (config: DeploymentConfig, price: number) => void;
  initialPlan?: number;
  gameData: any;
}

export interface DeploymentConfig {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  backups: boolean;
  ddosProtection: boolean;
  managedService: boolean;
}

const cpuOptions = [2, 4, 8, 16, 32];
const memoryOptions = [4, 8, 16, 32, 64];
const storageOptions = [50, 100, 200, 500, 1000];
const bandwidthOptions = [10, 50, 100, 500, 1000];

// 基础价格配置（每月）
const basePrices = {
  cpu: 10, // 每核心
  memory: 5, // 每GB
  storage: 0.5, // 每GB
  bandwidth: 0.2, // 每Mbps
  backups: 20, // 自动备份
  ddosProtection: 30, // DDoS防护
  managedService: 50, // 托管服务
};

const CustomDeployment: React.FC<CustomDeploymentProps> = ({ onConfigChange, initialPlan = 0 }) => {
  const [form] = Form.useForm();
  
  // 初始配置基于选择的方案
  const initialConfig: DeploymentConfig = {
    cpu: cpuOptions[Math.min(initialPlan, 2)],
    memory: memoryOptions[Math.min(initialPlan, 2)],
    storage: storageOptions[Math.min(initialPlan, 2)],
    bandwidth: bandwidthOptions[Math.min(initialPlan, 2)],
    backups: initialPlan >= 1,
    ddosProtection: initialPlan >= 2,
    managedService: initialPlan >= 2,
  };
  
  const [config, setConfig] = useState<DeploymentConfig>(initialConfig);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // 计算价格
  const calculatePrice = (config: DeploymentConfig) => {
    const cpuPrice = config.cpu * basePrices.cpu;
    const memoryPrice = config.memory * basePrices.memory;
    const storagePrice = config.storage * basePrices.storage;
    const bandwidthPrice = config.bandwidth * basePrices.bandwidth;
    
    let addonsPrice = 0;
    if (config.backups) addonsPrice += basePrices.backups;
    if (config.ddosProtection) addonsPrice += basePrices.ddosProtection;
    if (config.managedService) addonsPrice += basePrices.managedService;
    
    return cpuPrice + memoryPrice + storagePrice + bandwidthPrice + addonsPrice;
  };
  
  // 当配置变化时更新价格
  useEffect(() => {
    const price = calculatePrice(config);
    setTotalPrice(price);
    onConfigChange(config, price);
  }, [config, onConfigChange]);
  
  // 处理配置变化
  const handleConfigChange = (_changedValues: any, allValues: any) => {
    const newConfig = {
      cpu: allValues.cpu,
      memory: allValues.memory,
      storage: allValues.storage,
      bandwidth: allValues.bandwidth,
      backups: allValues.backups,
      ddosProtection: allValues.ddosProtection,
      managedService: allValues.managedService,
    };
    
    setConfig(newConfig);
  };
  
  return (
    <CustomizationContainer>
      <Alert
        message="自定义配置"
        description="根据您的需求自定义服务器配置。拖动滑块或直接输入值来调整CPU、内存、存储和带宽。您还可以选择添加额外的服务。"
        type="info"
        showIcon
        style={{ marginBottom: theme.space.lg }}
      />
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialConfig}
        onValuesChange={handleConfigChange}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <OptionCard title="硬件配置">
              <SliderContainer>
                <Form.Item name="cpu" label="CPU核心数">
                  <SliderLabel>
                    <span>2核</span>
                    <span>32核</span>
                  </SliderLabel>
                  <Slider
                    min={2}
                    max={32}
                    step={null}
                    marks={{
                      2: '2核',
                      4: '4核',
                      8: '8核',
                      16: '16核',
                      32: '32核',
                    }}
                    tooltip={{ formatter: (value) => `${value}核` }}
                  />
                  <SliderValue>{config.cpu}核 (¥{config.cpu * basePrices.cpu}/月)</SliderValue>
                </Form.Item>
              </SliderContainer>
              
              <SliderContainer>
                <Form.Item name="memory" label="内存容量">
                  <SliderLabel>
                    <span>4GB</span>
                    <span>64GB</span>
                  </SliderLabel>
                  <Slider
                    min={4}
                    max={64}
                    step={null}
                    marks={{
                      4: '4GB',
                      8: '8GB',
                      16: '16GB',
                      32: '32GB',
                      64: '64GB',
                    }}
                    tooltip={{ formatter: (value) => `${value}GB` }}
                  />
                  <SliderValue>{config.memory}GB (¥{config.memory * basePrices.memory}/月)</SliderValue>
                </Form.Item>
              </SliderContainer>
              
              <SliderContainer>
                <Form.Item name="storage" label="存储空间">
                  <SliderLabel>
                    <span>50GB</span>
                    <span>1TB</span>
                  </SliderLabel>
                  <Slider
                    min={50}
                    max={1000}
                    step={null}
                    marks={{
                      50: '50GB',
                      100: '100GB',
                      200: '200GB',
                      500: '500GB',
                      1000: '1TB',
                    }}
                    tooltip={{ formatter: (value) => value && value >= 1000 ? `${value/1000}TB` : `${value || 0}GB` }}
                  />
                  <SliderValue>
                    {config.storage >= 1000 ? `${config.storage/1000}TB` : `${config.storage}GB`} 
                    (¥{config.storage * basePrices.storage}/月)
                  </SliderValue>
                </Form.Item>
              </SliderContainer>
              
              <SliderContainer>
                <Form.Item name="bandwidth" label="带宽">
                  <SliderLabel>
                    <span>10Mbps</span>
                    <span>1Gbps</span>
                  </SliderLabel>
                  <Slider
                    min={10}
                    max={1000}
                    step={null}
                    marks={{
                      10: '10Mbps',
                      50: '50Mbps',
                      100: '100Mbps',
                      500: '500Mbps',
                      1000: '1Gbps',
                    }}
                    tooltip={{ formatter: (value) => value && value >= 1000 ? `${value/1000}Gbps` : `${value || 0}Mbps` }}
                  />
                  <SliderValue>
                    {config.bandwidth >= 1000 ? `${config.bandwidth/1000}Gbps` : `${config.bandwidth}Mbps`} 
                    (¥{config.bandwidth * basePrices.bandwidth}/月)
                  </SliderValue>
                </Form.Item>
              </SliderContainer>
            </OptionCard>
          </Col>
          
          <Col xs={24} md={12}>
            <OptionCard title="附加服务">
              <Form.Item name="backups" valuePropName="checked" label="自动备份">
                <Switch />
              </Form.Item>
              <Text type="secondary">每日自动备份您的服务器数据，保留最近7天的备份。(¥{basePrices.backups}/月)</Text>
              
              <Divider style={{ margin: `${theme.space.md} 0` }} />
              
              <Form.Item name="ddosProtection" valuePropName="checked" label="DDoS防护">
                <Switch />
              </Form.Item>
              <Text type="secondary">提供高级DDoS防护，保护您的服务器免受攻击。(¥{basePrices.ddosProtection}/月)</Text>
              
              <Divider style={{ margin: `${theme.space.md} 0` }} />
              
              <Form.Item name="managedService" valuePropName="checked" label="托管服务">
                <Switch />
              </Form.Item>
              <Text type="secondary">我们的技术团队将帮助您管理服务器，包括更新、维护和故障排除。(¥{basePrices.managedService}/月)</Text>
            </OptionCard>
            
            <OptionCard>
              <Title level={4} style={{ display: 'flex', alignItems: 'center' }}>
                <CalculatorOutlined style={{ marginRight: theme.space.sm }} /> 价格计算
              </Title>
              
              <Row>
                <Col span={12}>CPU ({config.cpu}核):</Col>
                <Col span={12} style={{ textAlign: 'right' }}>¥{config.cpu * basePrices.cpu}</Col>
              </Row>
              <Row>
                <Col span={12}>内存 ({config.memory}GB):</Col>
                <Col span={12} style={{ textAlign: 'right' }}>¥{config.memory * basePrices.memory}</Col>
              </Row>
              <Row>
                <Col span={12}>存储 ({config.storage}GB):</Col>
                <Col span={12} style={{ textAlign: 'right' }}>¥{config.storage * basePrices.storage}</Col>
              </Row>
              <Row>
                <Col span={12}>带宽 ({config.bandwidth}Mbps):</Col>
                <Col span={12} style={{ textAlign: 'right' }}>¥{config.bandwidth * basePrices.bandwidth}</Col>
              </Row>
              
              {config.backups && (
                <Row>
                  <Col span={12}>自动备份:</Col>
                  <Col span={12} style={{ textAlign: 'right' }}>¥{basePrices.backups}</Col>
                </Row>
              )}
              
              {config.ddosProtection && (
                <Row>
                  <Col span={12}>DDoS防护:</Col>
                  <Col span={12} style={{ textAlign: 'right' }}>¥{basePrices.ddosProtection}</Col>
                </Row>
              )}
              
              {config.managedService && (
                <Row>
                  <Col span={12}>托管服务:</Col>
                  <Col span={12} style={{ textAlign: 'right' }}>¥{basePrices.managedService}</Col>
                </Row>
              )}
              
              <Divider style={{ margin: `${theme.space.md} 0` }} />
              
              <Row>
                <Col span={12}><strong>每月总价:</strong></Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <PriceTag>¥{totalPrice.toFixed(2)}</PriceTag>
                </Col>
              </Row>
            </OptionCard>
          </Col>
        </Row>
      </Form>
    </CustomizationContainer>
  );
};

export default CustomDeployment;