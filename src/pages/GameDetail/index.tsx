import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button, Tabs, Rate, Tag, Divider, Row, Col, Card, Image, Descriptions, Tooltip } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';


const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const GameHeader = styled.div`
  display: flex;
  gap: ${theme.space.xl};
  margin-bottom: ${theme.space.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const GameImageContainer = styled.div`
  flex: 0 0 40%;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex: 0 0 100%;
  }
`;

const GameInfo = styled.div`
  flex: 1;
`;

const GameTitle = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: ${theme.space.sm};
`;

const GameMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.md};
  flex-wrap: wrap;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: ${theme.space.xs};
  margin-bottom: ${theme.space.md};
  flex-wrap: wrap;
`;

const GameDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space.lg};
  line-height: 1.6;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.space.sm};
  margin-bottom: ${theme.space.lg};
`;

const CurrentPrice = styled.span`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.secondary};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background-color: ${theme.colors.accent};
  color: white;
  font-weight: 600;
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.space.xl};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};
  margin-bottom: ${theme.space.sm};
  color: ${theme.colors.text.secondary};
  
  svg {
    color: ${theme.colors.success};
  }
`;

const TabContent = styled.div`
  padding: ${theme.space.lg} 0;
`;

const SpecTable = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const ScreenshotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.xl};
`;

const ScreenshotItem = styled.div`
  border-radius: ${theme.radii.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: transform ${theme.transitions.fast} ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const RelatedGamesSection = styled.div`
  margin-top: ${theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.space.lg};
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.primary};
    margin-top: ${theme.space.xs};
    border-radius: ${theme.radii.full};
  }
`;

// 模拟游戏数据
const gameData = {
  id: '1',
  title: 'Minecraft',
  description: 'Minecraft是一款关于方块与冒险的游戏。探索随机生成的世界，建造从简单的房子到宏伟的城堡的一切事物。在创造模式下使用无限的资源来创造，或者在生存模式中深入世界，制作武器和盔甲来抵御危险的生物。',
  longDescription: `Minecraft是一款沙盒游戏，由Mojang Studios开发。游戏中没有特定的目标，玩家可以自由地在一个无限生成的世界中建造和探索。

在生存模式中，玩家需要收集资源来建造结构、制作物品和武器，同时需要保持健康和饥饿值。玩家可以与各种生物互动，有些是友好的，而有些则是敌对的。

在创造模式中，玩家拥有无限的资源，可以自由飞行，并且不会受到伤害，这使得建造大型项目变得更加容易。

Minecraft的世界由不同的生物群系组成，包括森林、沙漠、雪原等，每个生物群系都有其独特的地形、植物和生物。游戏中还有下界和末地两个维度，玩家可以通过特殊的传送门访问这些维度。

多人游戏模式允许玩家在同一个世界中一起玩耍，可以合作建造或者相互竞争。`,
  imageUrl: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg',
  price: 199,
  discountPrice: 159,
  rating: 4.8,
  releaseDate: '2011-11-18',
  developer: 'Mojang Studios',
  publisher: 'Mojang Studios',
  tags: ['沙盒', '冒险', '多人', '建造', '生存'],
  features: [
    '无限的随机生成世界',
    '多种游戏模式：生存、创造、冒险、旁观者',
    '支持单人和多人游戏',
    '丰富的生物群系和地形',
    '多样化的生物和怪物',
    '强大的红石机械系统',
    '支持模组和资源包',
  ],
  systemRequirements: {
    minimum: {
      os: 'Windows 7 或更高版本',
      processor: 'Intel Core i3-3210 / AMD A8-7600',
      memory: '4 GB RAM',
      graphics: 'Intel HD Graphics 4000 或 AMD Radeon R5 系列',
      storage: '1 GB 可用空间',
    },
    recommended: {
      os: 'Windows 10',
      processor: 'Intel Core i5-4690 / AMD A10-7800',
      memory: '8 GB RAM',
      graphics: 'GeForce 700 Series 或 AMD Radeon Rx 200 Series',
      storage: '4 GB 可用空间',
    },
  },
  screenshots: [
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/snapshot-23w13a-header.jpg',
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/trails-and-tales-header.jpg',
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/Minecraft_Armadillo_Blocker.jpg',
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/Minecraft_Breeze_Blocker.jpg',
  ],
  deploymentOptions: [
    { name: '基础版', cpu: '2核', memory: '4GB', storage: '50GB', price: 20 },
    { name: '标准版', cpu: '4核', memory: '8GB', storage: '100GB', price: 40 },
    { name: '高级版', cpu: '8核', memory: '16GB', storage: '200GB', price: 80 },
  ],
};

// 模拟相关游戏数据
const relatedGames = [
  {
    id: '2',
    title: 'Terraria',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg',
    price: 60,
  },
  {
    id: '3',
    title: 'Stardew Valley',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    price: 80,
    discountPrice: 48,
  },
  {
    id: '4',
    title: 'Valheim',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg',
    price: 98,
  },
];

const GameDetailPage: React.FC = () => {
  // 在实际应用中，我们会使用id参数来获取游戏数据
  const { id: _id } = useParams<{ id: string }>(); // 使用下划线前缀忽略未使用的变量
  const [activeTab, setActiveTab] = useState('1');
  
  // 在实际应用中，这里应该根据ID从API获取游戏数据
  // const [game, setGame] = useState<GameData | null>(null);
  // useEffect(() => {
  //   // 获取游戏数据的API调用
  //   fetchGameById(id).then(data => setGame(data));
  // }, [id]);
  
  const hasDiscount = gameData.discountPrice !== undefined && gameData.discountPrice < gameData.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((gameData.price - (gameData.discountPrice || 0)) / gameData.price) * 100) 
    : 0;
  const navigate = useNavigate();
  
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '游戏介绍',
      children: (
        <TabContent>
          <p style={{ whiteSpace: 'pre-line' }}>{gameData.longDescription}</p>
          
          <Divider />
          
          <SectionTitle>游戏特性</SectionTitle>
          <FeatureList>
            {gameData.features.map((feature, index) => (
              <FeatureItem key={index}>
                <CheckCircleOutlined /> {feature}
              </FeatureItem>
            ))}
          </FeatureList>
          
          <SectionTitle>游戏截图</SectionTitle>
          <ScreenshotGrid>
            {gameData.screenshots.map((screenshot, index) => (
              <ScreenshotItem key={index}>
                <Image src={screenshot} alt={`${gameData.title} 截图 ${index + 1}`} />
              </ScreenshotItem>
            ))}
          </ScreenshotGrid>
        </TabContent>
      ),
    },
    {
      key: '2',
      label: '系统需求',
      children: (
        <TabContent>
          <SectionTitle>最低配置</SectionTitle>
          <SpecTable>
            <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="操作系统">{gameData.systemRequirements.minimum.os}</Descriptions.Item>
              <Descriptions.Item label="处理器">{gameData.systemRequirements.minimum.processor}</Descriptions.Item>
              <Descriptions.Item label="内存">{gameData.systemRequirements.minimum.memory}</Descriptions.Item>
              <Descriptions.Item label="显卡">{gameData.systemRequirements.minimum.graphics}</Descriptions.Item>
              <Descriptions.Item label="存储空间">{gameData.systemRequirements.minimum.storage}</Descriptions.Item>
            </Descriptions>
          </SpecTable>
          
          <SectionTitle>推荐配置</SectionTitle>
          <SpecTable>
            <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="操作系统">{gameData.systemRequirements.recommended.os}</Descriptions.Item>
              <Descriptions.Item label="处理器">{gameData.systemRequirements.recommended.processor}</Descriptions.Item>
              <Descriptions.Item label="内存">{gameData.systemRequirements.recommended.memory}</Descriptions.Item>
              <Descriptions.Item label="显卡">{gameData.systemRequirements.recommended.graphics}</Descriptions.Item>
              <Descriptions.Item label="存储空间">{gameData.systemRequirements.recommended.storage}</Descriptions.Item>
            </Descriptions>
          </SpecTable>
        </TabContent>
      ),
    },
  ];
  
  return (
    <DetailContainer>
      <GameHeader>
        <GameImageContainer>
          <img src={gameData.imageUrl} alt={gameData.title} style={{ width: '100%' }} />
        </GameImageContainer>
        
        <GameInfo>
          <GameTitle>{gameData.title}</GameTitle>
          
          <GameMeta>
            <Rate disabled defaultValue={gameData.rating} allowHalf />
            <span>({gameData.rating})</span>
            <Divider type="vertical" />
            <span>发行日期: {gameData.releaseDate}</span>
          </GameMeta>
          
          <TagsContainer>
            {gameData.tags.map((tag, index) => (
              <Tag key={index} color={index % 3 === 0 ? theme.colors.primary : index % 3 === 1 ? theme.colors.secondary : theme.colors.accent}>
                {tag}
              </Tag>
            ))}
          </TagsContainer>
          
          <GameDescription>{gameData.description}</GameDescription>
          
          <div>
            <p><strong>开发商:</strong> {gameData.developer}</p>
            <p><strong>发行商:</strong> {gameData.publisher}</p>
          </div>
          
          <Divider />
          
          <PriceContainer>
            <CurrentPrice>¥{hasDiscount ? gameData.discountPrice : gameData.price}</CurrentPrice>
            {hasDiscount && (
              <>
                <OriginalPrice>¥{gameData.price}</OriginalPrice>
                <DiscountBadge>-{discountPercentage}%</DiscountBadge>
              </>
            )}
          </PriceContainer>
          
          <ActionButtons>
            <Button 
              type="primary" 
              size="large" 
              icon={<RocketOutlined />}
              onClick={() => navigate(`/game-purchase/${gameData.id}`)}
            >
              购买游戏
            </Button>
          </ActionButtons>
          
          <FeatureList>
            <FeatureItem>
              <CheckCircleOutlined /> 购买后即可部署
            </FeatureItem>
            <FeatureItem>
              <CheckCircleOutlined /> 7天无理由退款
            </FeatureItem>
            <FeatureItem>
              <CheckCircleOutlined /> 24/7 技术支持
            </FeatureItem>
          </FeatureList>
        </GameInfo>
      </GameHeader>
      
      <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} />
      
      <RelatedGamesSection>
        <SectionTitle>相关游戏</SectionTitle>
        <Row gutter={[16, 16]}>
          {relatedGames.map(game => (
            <Col xs={24} sm={12} md={8} key={game.id}>
              <Card 
                hoverable 
                cover={<img alt={game.title} src={game.imageUrl} />}
                actions={[
                  <Tooltip title="查看详情">
                    <Link to={`/games/${game.id}`}>查看详情</Link>
                  </Tooltip>,

                ]}
              >
                <Card.Meta 
                  title={game.title} 
                  description={
                    <PriceContainer style={{ marginBottom: 0 }}>
                      {game.discountPrice ? (
                        <>
                          <CurrentPrice style={{ fontSize: theme.fontSizes.lg }}>¥{game.discountPrice}</CurrentPrice>
                          <OriginalPrice style={{ fontSize: theme.fontSizes.md }}>¥{game.price}</OriginalPrice>
                        </>
                      ) : (
                        <CurrentPrice style={{ fontSize: theme.fontSizes.lg }}>¥{game.price}</CurrentPrice>
                      )}
                    </PriceContainer>
                  } 
                />
              </Card>
            </Col>
          ))}
        </Row>
      </RelatedGamesSection>
    </DetailContainer>
  );
};

export default GameDetailPage;