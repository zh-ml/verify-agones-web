import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Button, Tabs, Row, Col, Typography, Divider, message } from 'antd';
import { ShoppingCartOutlined, RocketOutlined } from '@ant-design/icons';
import { theme } from '../../styles/theme';
import { games as mockGames } from '../../utils/mockData';
import { useCart } from '../../contexts/CartContext';

const { Title, Text } = Typography;

const PurchaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const GameHeader = styled.div`
  display: flex;
  margin-bottom: ${theme.space.xl};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GameImage = styled.img`
  width: 300px;
  height: 180px;
  object-fit: cover;
  border-radius: ${theme.radii.md};
  margin-right: ${theme.space.xl};
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: ${theme.space.md};
  }
`;

const GameInfo = styled.div`
  flex: 1;
`;

const PriceTag = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin: ${theme.space.md} 0;
`;

const DiscountTag = styled.span`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 2px 8px;
  border-radius: ${theme.radii.sm};
  font-size: ${theme.fontSizes.sm};
  margin-left: ${theme.space.sm};
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.space.sm};
  font-size: ${theme.fontSizes.md};
`;

const DeploymentCard = styled(Card)`
  margin-bottom: ${theme.space.md};
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: ${theme.space.sm};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }
  
  th {
    font-weight: bold;
    background-color: #f5f5f5;
  }
`;

interface GameData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  screenshots: string[];
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  rating: number;
  tags: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
      network: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
      network: string;
    };
  };
  features: string[];
  deploymentOptions: any[];
}

const GamePurchasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // 在实际应用中，这里会从API获取游戏数据
  const gameData: GameData = mockGames.find((game: any) => game.id === id) || mockGames[0];
  
  const [activeTab, setActiveTab] = useState('1');
  
  const handleAddToCart = () => {
    addToCart({
      id: gameData.id,
      title: gameData.title,
      description: gameData.description,
      imageUrl: gameData.coverImage,
      price: gameData.price,
      discountPrice: gameData.discountPrice,
      developer: gameData.developer,
      publisher: gameData.publisher
    });
    message.success('已添加到购物车！');
  };

  const handleBuyNow = () => {
    addToCart({
      id: gameData.id,
      title: gameData.title,
      description: gameData.description,
      imageUrl: gameData.coverImage,
      price: gameData.price,
      discountPrice: gameData.discountPrice,
      developer: gameData.developer,
      publisher: gameData.publisher
    });
    navigate('/cart');
  };
  
  const handleDeployNow = (planIndex: number) => {
    navigate(`/deployment/${gameData.id}?plan=${planIndex}`);
  };
  
  return (
    <PurchaseContainer>
      <GameHeader>
        <GameImage src={gameData.coverImage} alt={gameData.title} />
        
        <GameInfo>
          <Title level={2}>{gameData.title}</Title>
          <Text type="secondary">开发商: {gameData.developer}</Text>
          <div>
            <PriceTag>
              ¥{gameData.discountPrice || gameData.price}
              {gameData.discountPrice && (
                <>
                  <DiscountTag>{Math.round((1 - gameData.discountPrice / gameData.price) * 100)}% OFF</DiscountTag>
                  <OriginalPrice>¥{gameData.price}</OriginalPrice>
                </>
              )}
            </PriceTag>
          </div>
          
          <div>
            <Button 
              type="primary" 
              size="large" 
              icon={<ShoppingCartOutlined />} 
              onClick={handleAddToCart}
              style={{ marginRight: theme.space.md }}
            >
              加入购物车
            </Button>
            
            <Button 
              size="large" 
              onClick={handleBuyNow}
            >
              立即购买
            </Button>
          </div>
        </GameInfo>
      </GameHeader>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="游戏介绍" key="1">
          <div dangerouslySetInnerHTML={{ __html: gameData.description }} />
          
          <Title level={4} style={{ marginTop: theme.space.xl }}>系统需求</Title>
          <SpecTable>
            <thead>
              <tr>
                <th>配置</th>
                <th>最低配置</th>
                <th>推荐配置</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>操作系统</td>
                <td>{gameData.systemRequirements.minimum.os}</td>
                <td>{gameData.systemRequirements.recommended.os}</td>
              </tr>
              <tr>
                <td>处理器</td>
                <td>{gameData.systemRequirements.minimum.processor}</td>
                <td>{gameData.systemRequirements.recommended.processor}</td>
              </tr>
              <tr>
                <td>内存</td>
                <td>{gameData.systemRequirements.minimum.memory}</td>
                <td>{gameData.systemRequirements.recommended.memory}</td>
              </tr>
              <tr>
                <td>显卡</td>
                <td>{gameData.systemRequirements.minimum.graphics}</td>
                <td>{gameData.systemRequirements.recommended.graphics}</td>
              </tr>
              <tr>
                <td>存储空间</td>
                <td>{gameData.systemRequirements.minimum.storage}</td>
                <td>{gameData.systemRequirements.recommended.storage}</td>
              </tr>
            </tbody>
          </SpecTable>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="部署方案" key="2">
          <Title level={4}>选择部署方案</Title>
          <Text type="secondary" style={{ marginBottom: theme.space.md, display: 'block' }}>
            选择适合您的服务器配置方案，或者点击"自定义配置"按钮进行个性化设置。
          </Text>
          
          <Row gutter={[16, 16]}>
            {gameData.deploymentOptions.map((option, index) => (
              <Col xs={24} md={8} key={index}>
                <DeploymentCard 
                  title={option.name}
                  extra={<Text type="secondary">¥{option.basePrice}/月</Text>}
                >
                  <p><strong>CPU:</strong> {option.specs.cpu}</p>
                  <p><strong>内存:</strong> {option.specs.memory}</p>
                  <p><strong>存储:</strong> {option.specs.storage}</p>
                  <p><strong>带宽:</strong> {option.specs.bandwidth}</p>
                  <p><strong>适合人数:</strong> {index === 0 ? '5-10人' : index === 1 ? '10-25人' : '25-50人'}</p>
                  
                  <Divider style={{ margin: `${theme.space.md} 0` }} />
                  
                  <Button 
                    type="primary" 
                    icon={<RocketOutlined />} 
                    block
                    onClick={() => handleDeployNow(index)}
                  >
                    选择此方案
                  </Button>
                </DeploymentCard>
              </Col>
            ))}
            
            <Col xs={24} md={8}>
              <DeploymentCard 
                title="自定义配置"
                extra={<Text type="secondary">灵活定价</Text>}
              >
                <p>根据您的需求自定义服务器配置：</p>
                <ul>
                  <li>自由选择CPU核心数</li>
                  <li>灵活配置内存大小</li>
                  <li>按需设置存储空间</li>
                  <li>选择带宽和附加服务</li>
                </ul>
                
                <Divider style={{ margin: `${theme.space.md} 0` }} />
                
                <Button 
                  type="primary" 
                  icon={<RocketOutlined />} 
                  block
                  onClick={() => navigate(`/deployment/${gameData.id}?custom=true`)}
                >
                  自定义配置
                </Button>
              </DeploymentCard>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </PurchaseContainer>
  );
};

export default GamePurchasePage;