import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Row, Col, Card, Button, Tag, Divider } from 'antd';
import { 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  DollarOutlined,
  TeamOutlined,
  RocketOutlined
} from '@ant-design/icons';

// 样式组件
const CareersContainer = styled.div`
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

const BenefitCard = styled(Card)`
  height: 100%;
  text-align: center;
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 48px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
`;

const BenefitTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.sm};
`;

const BenefitDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const JobSection = styled.div`
  margin: ${theme.space.xl} 0;
`;

const JobCard = styled(Card)`
  margin-bottom: ${theme.space.lg};
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const JobTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.sm};
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.space.xs};
  }
`;

const JobMetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.secondary};
  
  svg {
    margin-right: ${theme.space.xs};
  }
`;

const JobDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${theme.space.md};
`;

const JobTags = styled.div`
  margin-bottom: ${theme.space.md};
  
  .ant-tag {
    margin-bottom: ${theme.space.xs};
  }
`;

const ProcessSection = styled.div`
  margin: ${theme.space.xl} 0;
  padding: ${theme.space.xl} 0;
  background-color: ${theme.colors.background};
`;

const ProcessStep = styled.div`
  text-align: center;
  padding: ${theme.space.lg};
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: white;
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.space.md};
`;

const StepTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.sm};
`;

const StepDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const CareersPage: React.FC = () => {
  // 职位数据
  const jobs = [
    {
      id: 1,
      title: '全栈开发工程师',
      location: '深圳',
      type: '全职',
      salary: '25K-35K',
      department: '技术部',
      description: '负责公司核心产品的前后端开发，包括游戏部署平台和游戏商店的功能实现和优化。',
      requirements: [
        '3年以上全栈开发经验',
        '精通React、Node.js等前后端技术',
        '熟悉云服务和容器技术',
        '有游戏行业经验优先'
      ],
      tags: ['React', 'Node.js', 'TypeScript', 'Docker', '微服务']
    },
    {
      id: 2,
      title: '游戏运维工程师',
      location: '深圳',
      type: '全职',
      salary: '20K-30K',
      department: '运维部',
      description: '负责游戏服务器的部署、监控和维护，确保服务的稳定性和性能。',
      requirements: [
        '2年以上运维经验',
        '熟悉Linux系统和Shell脚本',
        '熟悉Docker、Kubernetes等容器技术',
        '有游戏服务器运维经验优先'
      ],
      tags: ['Linux', 'Docker', 'Kubernetes', 'Shell', '监控系统']
    },
    {
      id: 3,
      title: '产品经理',
      location: '深圳',
      type: '全职',
      salary: '25K-40K',
      department: '产品部',
      description: '负责游戏部署平台和游戏商店的产品规划、需求分析和功能设计。',
      requirements: [
        '3年以上产品经理经验',
        '熟悉游戏行业和云服务',
        '良好的沟通能力和团队协作能力',
        '有技术背景优先'
      ],
      tags: ['产品规划', '用户体验', '需求分析', '项目管理']
    },
    {
      id: 4,
      title: 'UI/UX设计师',
      location: '深圳',
      type: '全职',
      salary: '15K-25K',
      department: '设计部',
      description: '负责公司产品的用户界面和用户体验设计，包括网站、移动应用和营销材料。',
      requirements: [
        '2年以上UI/UX设计经验',
        '精通Figma、Sketch等设计工具',
        '良好的审美能力和创意思维',
        '有游戏或SaaS产品设计经验优先'
      ],
      tags: ['UI设计', 'UX设计', 'Figma', 'Sketch', '响应式设计']
    }
  ];

  // 招聘流程
  const hiringProcess = [
    {
      step: 1,
      title: '简历筛选',
      description: '我们会仔细审核您的简历和求职信，评估您的技能和经验是否符合职位要求。'
    },
    {
      step: 2,
      title: '初步面试',
      description: '通过电话或视频进行初步面试，了解您的背景、经验和职业目标。'
    },
    {
      step: 3,
      title: '技术评估',
      description: '根据职位需求，可能会有技术测试、案例分析或设计作品展示环节。'
    },
    {
      step: 4,
      title: '团队面试',
      description: '与潜在的团队成员和主管进行面对面或视频面试，深入了解您的专业能力和团队协作能力。'
    },
    {
      step: 5,
      title: '最终面试',
      description: '与公司高管进行最终面试，讨论您的职业发展和公司文化契合度。'
    },
    {
      step: 6,
      title: '录用通知',
      description: '如果您成功通过所有面试环节，我们将发出正式的录用通知，并讨论入职事宜。'
    }
  ];

  return (
    <CareersContainer>
      <HeroSection>
        <PageTitle>加入我们</PageTitle>
        <Subtitle>
          TheNinth是一个充满激情和创新的团队，我们致力于为游戏开发者和玩家创造最佳的游戏体验。如果您热爱游戏和技术，并希望在一个充满活力的环境中工作，我们期待您的加入！
        </Subtitle>
      </HeroSection>
      
      <SectionTitle>为什么选择TheNinth？</SectionTitle>
      <SectionSubtitle>
        在TheNinth，我们不仅提供具有竞争力的薪资和福利，还创造了一个鼓励创新、支持个人成长的工作环境。
      </SectionSubtitle>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <RocketOutlined />
            </BenefitIcon>
            <BenefitTitle>创新文化</BenefitTitle>
            <BenefitDescription>
              我们鼓励创新思维和尝试新想法，为员工提供自由发挥创造力的空间。
            </BenefitDescription>
          </BenefitCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <TeamOutlined />
            </BenefitIcon>
            <BenefitTitle>团队协作</BenefitTitle>
            <BenefitDescription>
              我们相信团队的力量，通过紧密合作和开放沟通，共同解决挑战。
            </BenefitDescription>
          </BenefitCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <DollarOutlined />
            </BenefitIcon>
            <BenefitTitle>有竞争力的薪资</BenefitTitle>
            <BenefitDescription>
              我们提供行业内具有竞争力的薪资和全面的福利计划，包括健康保险、带薪休假等。
            </BenefitDescription>
          </BenefitCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <ClockCircleOutlined />
            </BenefitIcon>
            <BenefitTitle>灵活工作</BenefitTitle>
            <BenefitDescription>
              我们提供灵活的工作时间和远程工作选项，帮助员工平衡工作和生活。
            </BenefitDescription>
          </BenefitCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <EnvironmentOutlined />
            </BenefitIcon>
            <BenefitTitle>现代办公环境</BenefitTitle>
            <BenefitDescription>
              我们的办公室位于深圳科技园，提供舒适的工作环境和各种便利设施。
            </BenefitDescription>
          </BenefitCard>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <BenefitCard>
            <BenefitIcon>
              <RocketOutlined />
            </BenefitIcon>
            <BenefitTitle>职业发展</BenefitTitle>
            <BenefitDescription>
              我们重视员工的职业发展，提供培训机会和晋升通道，帮助员工实现职业目标。
            </BenefitDescription>
          </BenefitCard>
        </Col>
      </Row>
      
      <ProcessSection>
        <SectionTitle>招聘流程</SectionTitle>
        <SectionSubtitle>
          我们的招聘流程旨在全面了解候选人的技能、经验和文化契合度，同时也让候选人深入了解我们的团队和工作环境。
        </SectionSubtitle>
        
        <Row gutter={[16, 16]}>
          {hiringProcess.map(process => (
            <Col xs={24} sm={12} md={8} key={process.step}>
              <ProcessStep>
                <StepNumber>{process.step}</StepNumber>
                <StepTitle>{process.title}</StepTitle>
                <StepDescription>{process.description}</StepDescription>
              </ProcessStep>
            </Col>
          ))}
        </Row>
      </ProcessSection>
      
      <JobSection>
        <SectionTitle>当前职位</SectionTitle>
        <SectionSubtitle>
          浏览我们当前的职位空缺，找到适合您技能和兴趣的职位。如果您没有找到合适的职位，也可以发送您的简历至careers@theninth.com，我们会在有合适职位时联系您。
        </SectionSubtitle>
        
        {jobs.map(job => (
          <JobCard key={job.id}>
            <JobTitle>{job.title}</JobTitle>
            <JobMeta>
              <JobMetaItem>
                <EnvironmentOutlined /> {job.location}
              </JobMetaItem>
              <JobMetaItem>
                <ClockCircleOutlined /> {job.type}
              </JobMetaItem>
              <JobMetaItem>
                <DollarOutlined /> {job.salary}
              </JobMetaItem>
              <JobMetaItem>
                <TeamOutlined /> {job.department}
              </JobMetaItem>
            </JobMeta>
            
            <JobDescription>{job.description}</JobDescription>
            
            <Divider orientation="left">要求</Divider>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            
            <Divider orientation="left">技能标签</Divider>
            <JobTags>
              {job.tags.map(tag => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </JobTags>
            
            <Button type="primary" size="large">
              申请职位
            </Button>
          </JobCard>
        ))}
      </JobSection>
    </CareersContainer>
  );
};

export default CareersPage;