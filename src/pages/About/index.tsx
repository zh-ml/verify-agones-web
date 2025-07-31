import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Row, Col, Card, Avatar, Divider } from 'antd';
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  CustomerServiceOutlined, 
  TeamOutlined,
  TrophyOutlined,
  GlobalOutlined
} from '@ant-design/icons';

// 样式组件
const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.space.xl};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.md};
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto ${theme.space.xl};
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.lg};
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space.xl};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ValueCard = styled(Card)`
  height: 100%;
  text-align: center;
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  font-size: 48px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
`;

const ValueTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.sm};
`;

const ValueDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const StorySection = styled.div`
  margin: ${theme.space.xl} 0;
  padding: ${theme.space.xl} 0;
  background-color: ${theme.colors.background};
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
  
  p {
    margin-bottom: ${theme.space.md};
  }
`;

const TeamSection = styled.div`
  margin: ${theme.space.xl} 0;
`;

const TeamMemberCard = styled(Card)`
  text-align: center;
  height: 100%;
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MemberAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.space.md};
`;

const MemberName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.xs};
`;

const MemberTitle = styled.p`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
`;

const MemberBio = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const AboutPage: React.FC = () => {
  // 团队成员数据
  const teamMembers = [
    {
      id: 1,
      name: '张伟',
      title: '创始人 & CEO',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: '拥有10年游戏行业经验，曾在多家知名游戏公司担任技术负责人，致力于为游戏开发者提供最佳的部署解决方案。'
    },
    {
      id: 2,
      name: '李娜',
      title: '技术总监',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: '全栈开发专家，专注于云服务架构和高性能计算，拥有丰富的游戏服务器架构经验。'
    },
    {
      id: 3,
      name: '王强',
      title: '产品经理',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      bio: '前游戏策划，深入了解游戏开发流程和玩家需求，致力于打造最符合用户体验的产品。'
    },
    {
      id: 4,
      name: '刘芳',
      title: '客户成功总监',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: '拥有丰富的客户服务经验，确保每一位客户都能获得最佳的服务体验和技术支持。'
    }
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <PageTitle>关于我们</PageTitle>
        <Subtitle>
          TheNinth 是一家专注于游戏服务器部署和游戏销售的创新科技公司。我们致力于为游戏开发者和玩家提供最佳的游戏体验和服务器解决方案。
        </Subtitle>
      </HeroSection>
      
      <SectionTitle>我们的价值观</SectionTitle>
      <SectionSubtitle>
        我们的核心价值观指导着我们的每一个决策和行动，确保我们始终为客户提供最优质的服务。
      </SectionSubtitle>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <RocketOutlined />
            </ValueIcon>
            <ValueTitle>创新</ValueTitle>
            <ValueDescription>
              我们不断探索新技术和解决方案，为客户提供最前沿的游戏部署体验。
            </ValueDescription>
          </ValueCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <SafetyCertificateOutlined />
            </ValueIcon>
            <ValueTitle>安全可靠</ValueTitle>
            <ValueDescription>
              我们将安全和可靠性放在首位，确保客户的游戏和数据始终受到保护。
            </ValueDescription>
          </ValueCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <CustomerServiceOutlined />
            </ValueIcon>
            <ValueTitle>卓越服务</ValueTitle>
            <ValueDescription>
              我们提供24/7的专业支持，确保客户在任何时候都能获得及时的帮助。
            </ValueDescription>
          </ValueCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <TeamOutlined />
            </ValueIcon>
            <ValueTitle>团队协作</ValueTitle>
            <ValueDescription>
              我们相信团队的力量，通过紧密合作为客户创造最大价值。
            </ValueDescription>
          </ValueCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <TrophyOutlined />
            </ValueIcon>
            <ValueTitle>追求卓越</ValueTitle>
            <ValueDescription>
              我们不断挑战自我，追求卓越，为客户提供超出预期的产品和服务。
            </ValueDescription>
          </ValueCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <ValueCard>
            <ValueIcon>
              <GlobalOutlined />
            </ValueIcon>
            <ValueTitle>全球视野</ValueTitle>
            <ValueDescription>
              我们拥有全球化的视野，为世界各地的游戏开发者和玩家提供服务。
            </ValueDescription>
          </ValueCard>
        </Col>
      </Row>
      
      <StorySection>
        <SectionTitle>我们的故事</SectionTitle>
        <StoryContent>
          <p>
            TheNinth 成立于2020年，由一群热爱游戏和技术的专业人士创立。我们注意到，许多游戏开发者在部署和维护游戏服务器时面临着巨大的挑战，这往往会分散他们对游戏本身开发的注意力。
          </p>
          <p>
            我们的使命是简化游戏服务器的部署和管理过程，让开发者能够专注于创造优秀的游戏体验。通过提供一站式的服务器解决方案，我们帮助开发者轻松应对服务器扩展、性能优化和安全防护等挑战。
          </p>
          <p>
            随着业务的发展，我们也开始涉足游戏销售领域，为玩家提供丰富多样的游戏选择。我们相信，通过连接开发者和玩家，我们能够创造一个更加繁荣的游戏生态系统。
          </p>
          <p>
            今天，TheNinth 已经服务了全球数百家游戏开发团队，支持了数千款游戏的部署和运营。我们将继续创新和进步，为游戏行业的发展贡献我们的力量。
          </p>
        </StoryContent>
      </StorySection>
      
      <TeamSection>
        <SectionTitle>我们的团队</SectionTitle>
        <SectionSubtitle>
          TheNinth 的团队由一群充满激情和创造力的专业人士组成，他们拥有丰富的游戏和技术经验。
        </SectionSubtitle>
        
        <Row gutter={[24, 24]}>
          {teamMembers.map(member => (
            <Col xs={24} sm={12} md={6} key={member.id}>
              <TeamMemberCard>
                <MemberAvatar src={member.avatar} size={120} />
                <MemberName>{member.name}</MemberName>
                <MemberTitle>{member.title}</MemberTitle>
                <Divider />
                <MemberBio>{member.bio}</MemberBio>
              </TeamMemberCard>
            </Col>
          ))}
        </Row>
      </TeamSection>
    </AboutContainer>
  );
};

export default AboutPage;