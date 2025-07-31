import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Badge, Avatar, Dropdown } from 'antd';
import { useCart } from '../contexts/CartContext';
import type { MenuProps } from 'antd';

const NavbarContainer = styled.nav`
  background-color: ${theme.colors.card};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${theme.space.md} 0;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.space.xs};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.space.lg};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? theme.colors.primary : theme.colors.text.primary};
  font-weight: ${props => props.$active ? '600' : '500'};
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.radii.md};
  transition: all ${theme.transitions.fast} ease;
  
  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.background};
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: ${theme.space.md};
  align-items: center;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.xl};
  cursor: pointer;
  display: none;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.md};
`;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/profile">个人资料</Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/dashboard">我的游戏</Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="/billing">计费设置</Link>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '4',
    label: '退出登录',
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { totalItems } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/">
          <span>TheNinth</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" $active={isActive('/')}>
            首页
          </NavLink>
          <NavLink to="/games" $active={isActive('/games')}>
            游戏库
          </NavLink>
          <NavLink to="/dashboard" $active={isActive('/dashboard')}>
            控制台
          </NavLink>
          <NavLink to="/about" $active={isActive('/about')}>
            关于我们
          </NavLink>
        </NavLinks>
        
        <NavActions>
          <Badge count={totalItems}>
            <Link to="/cart">
              <ShoppingCartOutlined style={{ fontSize: '24px', color: theme.colors.text.primary }} />
            </Link>
          </Badge>
          
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: theme.colors.primary }} />
          </Dropdown>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <MenuOutlined />
          </MobileMenuButton>
        </NavActions>
      </NavbarContent>
      
      <Drawer 
        title="菜单" 
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <MobileNavLinks>
          <NavLink to="/" $active={isActive('/')}>
            首页
          </NavLink>
          <NavLink to="/games" $active={isActive('/games')}>
            游戏库
          </NavLink>
          <NavLink to="/dashboard" $active={isActive('/dashboard')}>
            控制台
          </NavLink>
          <NavLink to="/about" $active={isActive('/about')}>
            关于我们
          </NavLink>
          <NavLink to="/profile" $active={isActive('/profile')}>
            个人资料
          </NavLink>
          <NavLink to="/cart" $active={isActive('/cart')}>
            购物车
          </NavLink>
        </MobileNavLinks>
      </Drawer>
    </NavbarContainer>
  );
};

export default Navbar;