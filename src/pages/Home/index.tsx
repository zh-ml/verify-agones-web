import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button, Row, Col, Carousel } from 'antd';
import { RocketOutlined, CloudServerOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard';
import type { GameData } from '../../components/GameCard';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #2D3A8C 100%);
  color: white;
  padding: ${theme.space['3xl']} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: ${theme.space.lg};
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: ${theme.space.xl};
  opacity: 0.9;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${theme.space.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.space.xl};
  font-size: ${theme.fontSizes['3xl']};
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${theme.colors.primary};
    margin: ${theme.space.sm} auto 0;
    border-radius: ${theme.radii.full};
  }
`;

const Section = styled.section`
  padding: ${theme.space['3xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`;

const FeatureCard = styled.div`
  background-color: ${theme.colors.card};
  border-radius: ${theme.radii.lg};
  padding: ${theme.space.xl};
  box-shadow: ${theme.shadows.md};
  height: 100%;
  transition: transform ${theme.transitions.normal} ease, box-shadow ${theme.transitions.normal} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.space.sm};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
`;

const CarouselContainer = styled.div`
  margin-bottom: ${theme.space['2xl']};
  
  .ant-carousel .slick-dots li button {
    background: ${theme.colors.primary};
    opacity: 0.4;
  }
  
  .ant-carousel .slick-dots li.slick-active button {
    opacity: 1;
  }
  
  .slick-slide {
    padding: 0 ${theme.space.sm};
  }
`;

const CarouselSlide = styled.div`
  height: 400px;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  position: relative;
`;

const CarouselImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 100%);
  }
`;

const CarouselContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.space.xl};
  color: white;
  z-index: 1;
`;

const CarouselTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.space.sm};
`;

const CarouselDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.space.md};
  opacity: 0.9;
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${theme.space.xl};
  font-weight: 500;
  font-size: ${theme.fontSizes.lg};
`;

// 模拟数据
const featuredGames: GameData[] = [
  {
    id: '1',
    title: 'Minecraft',
    description: '一款关于方块与冒险的游戏，你可以在游戏中探索无限世界，建造从简单的房子到宏伟的城堡的一切事物。',
    imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023-Trails_and_Tales_1170x500.jpg',
    price: 199,
    discountPrice: 159,
    rating: 4.8,
    tags: ['沙盒', '冒险', '多人'],
    releaseDate: '2011-11-18'
  },
  {
    id: '2',
    title: 'Counter-Strike 2',
    description: '《反恐精英2》是一款第一人称射击游戏，玩家分为恐怖分子与反恐精英两个阵营进行对抗。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    price: 99,
    rating: 4.7,
    tags: ['射击', '竞技', '团队'],
    releaseDate: '2023-09-27'
  },
  {
    id: '3',
    title: 'Stardew Valley',
    description: '继承你爷爷的旧农场，开始你的新生活。学习如何生活在土地上，种植庄稼，饲养动物，开始新的人际关系。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    price: 80,
    discountPrice: 48,
    rating: 4.9,
    tags: ['模拟', '角色扮演', '农场'],
    releaseDate: '2016-02-26'
  },
  {
    id: '4',
    title: 'Terraria',
    description: '挖掘、战斗、探索、建造！没有什么是不可能的在这个充满冒险的世界里。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg',
    price: 60,
    rating: 4.7,
    tags: ['沙盒', '冒险', '多人'],
    releaseDate: '2011-05-16'
  },
];

const newGames: GameData[] = [
  {
    id: '5',
    title: 'Palworld',
    description: '在这个开放世界生存游戏中，你可以捕获、训练和与神奇生物一起战斗，同时建造基地并与朋友一起探索。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg',
    price: 129,
    rating: 4.5,
    tags: ['开放世界', '生存', '多人'],
    releaseDate: '2024-01-19'
  },
  {
    id: '6',
    title: 'Baldur\'s Gate 3',
    description: '集结你的队伍，回到被遗忘的国度，体验一场史诗般的故事、复杂的角色互动和战术战斗的冒险。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    price: 298,
    rating: 4.9,
    tags: ['角色扮演', '回合制', '奇幻'],
    releaseDate: '2023-08-03'
  },
  {
    id: '7',
    title: 'Elden Ring',
    description: '一款由FromSoftware开发的动作角色扮演游戏，玩家将在一个广阔的世界中探索，与强大的敌人战斗。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    price: 298,
    discountPrice: 238,
    rating: 4.8,
    tags: ['动作', '角色扮演', '开放世界'],
    releaseDate: '2022-02-25'
  },
  {
    id: '8',
    title: 'Hogwarts Legacy',
    description: '《霍格沃茨遗产》是一款沉浸式的开放世界动作角色扮演游戏，玩家将体验霍格沃茨魔法学校的学生生活。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    price: 298,
    rating: 4.6,
    tags: ['开放世界', '角色扮演', '奇幻'],
    releaseDate: '2023-02-10'
  },
];

const carouselGames = [
  {
    id: '1',
    title: 'Minecraft',
    description: '探索无限世界，建造从简单的房子到宏伟的城堡的一切事物。',
    imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023-Trails_and_Tales_1170x500.jpg',
  },
  {
    id: '6',
    title: 'Baldur\'s Gate 3',
    description: '集结你的队伍，回到被遗忘的国度，体验一场史诗般的冒险。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
  },
  {
    id: '7',
    title: 'Elden Ring',
    description: '在一个广阔的世界中探索，与强大的敌人战斗，揭开隐藏的秘密。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
  },
];

const HomePage: React.FC = () => {
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>部署你的游戏服务器，从未如此简单</HeroTitle>
          <HeroSubtitle>
            TheNinth 提供一站式游戏服务器部署解决方案，让您轻松管理游戏服务器，专注于游戏体验。
          </HeroSubtitle>
          <HeroButtons>
            <Button type="primary" size="large">
              <Link to="/games">浏览游戏</Link>
            </Button>
            <Button size="large">
              <Link to="/about">了解更多</Link>
            </Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>
      
      <Section>
        <Container>
          <CarouselContainer>
            <Carousel autoplay effect="fade">
              {carouselGames.map(game => (
                <div key={game.id}>
                  <CarouselSlide>
                    <CarouselImage $imageUrl={game.imageUrl} />
                    <CarouselContent>
                      <CarouselTitle>{game.title}</CarouselTitle>
                      <CarouselDescription>{game.description}</CarouselDescription>
                      <Button type="primary" size="large">
                        <Link to={`/games/${game.id}`}>了解详情</Link>
                      </Button>
                    </CarouselContent>
                  </CarouselSlide>
                </div>
              ))}
            </Carousel>
          </CarouselContainer>
          
          <SectionTitle>热门游戏</SectionTitle>
          <Row gutter={[24, 24]}>
            {featuredGames.map(game => (
              <Col xs={24} sm={12} md={8} lg={6} key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
          <ViewAllLink to="/games">查看全部游戏 &rarr;</ViewAllLink>
        </Container>
      </Section>
      
      <Section style={{ backgroundColor: theme.colors.background }}>
        <Container>
          <SectionTitle>为什么选择 TheNinth？</SectionTitle>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard>
                <FeatureIcon>
                  <RocketOutlined />
                </FeatureIcon>
                <FeatureTitle>快速部署</FeatureTitle>
                <FeatureDescription>
                  只需几分钟，即可完成游戏服务器的部署，无需复杂配置。
                </FeatureDescription>
              </FeatureCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard>
                <FeatureIcon>
                  <CloudServerOutlined />
                </FeatureIcon>
                <FeatureTitle>高性能服务器</FeatureTitle>
                <FeatureDescription>
                  采用最新的云技术，提供高性能、低延迟的游戏服务器。
                </FeatureDescription>
              </FeatureCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard>
                <FeatureIcon>
                  <SafetyCertificateOutlined />
                </FeatureIcon>
                <FeatureTitle>安全可靠</FeatureTitle>
                <FeatureDescription>
                  多重安全防护，确保您的游戏数据安全，服务稳定可靠。
                </FeatureDescription>
              </FeatureCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard>
                <FeatureIcon>
                  <CustomerServiceOutlined />
                </FeatureIcon>
                <FeatureTitle>专业支持</FeatureTitle>
                <FeatureDescription>
                  7x24小时技术支持，解决您在使用过程中遇到的任何问题。
                </FeatureDescription>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <SectionTitle>新上线游戏</SectionTitle>
          <Row gutter={[24, 24]}>
            {newGames.map(game => (
              <Col xs={24} sm={12} md={8} lg={6} key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
          <ViewAllLink to="/games/new">查看更多新游戏 &rarr;</ViewAllLink>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;