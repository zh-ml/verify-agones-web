import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.card};
  padding: ${theme.space['2xl']} 0 ${theme.space.xl};
  margin-top: ${theme.space['3xl']};
  border-top: 1px solid ${theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.space.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.space.md};
  color: ${theme.colors.text.primary};
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space.sm};
  transition: color ${theme.transitions.fast} ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.space.md};
  margin-top: ${theme.space.sm};
`;

const SocialLink = styled.a`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.xl};
  transition: color ${theme.transitions.fast} ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${theme.space['2xl']};
  padding-top: ${theme.space.lg};
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.space.md};
  display: inline-block;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterColumn>
            <Logo to="/">TheNinth</Logo>
            <FooterText>
              专业的游戏部署平台，为您提供高性能、稳定可靠的游戏服务器解决方案。
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GithubOutlined />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>游戏</FooterTitle>
            <FooterLink to="/games/category/action">动作游戏</FooterLink>
            <FooterLink to="/games/category/adventure">冒险游戏</FooterLink>
            <FooterLink to="/games/category/rpg">角色扮演</FooterLink>
            <FooterLink to="/games/category/strategy">策略游戏</FooterLink>
            <FooterLink to="/games/category/simulation">模拟游戏</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>服务</FooterTitle>
            <FooterLink to="/services/hosting">游戏托管</FooterLink>
            <FooterLink to="/services/deployment">快速部署</FooterLink>
            <FooterLink to="/services/monitoring">性能监控</FooterLink>
            <FooterLink to="/services/scaling">弹性扩展</FooterLink>
            <FooterLink to="/services/support">技术支持</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>关于我们</FooterTitle>
            <FooterLink to="/about">公司简介</FooterLink>
            <FooterLink to="/contact">联系我们</FooterLink>
            <FooterLink to="/careers">加入我们</FooterLink>
            <FooterLink to="/privacy">隐私政策</FooterLink>
            <FooterLink to="/terms">服务条款</FooterLink>
          </FooterColumn>
        </FooterGrid>
        
        <Copyright>
          <p>&copy; {new Date().getFullYear()} TheNinth. 保留所有权利。</p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;