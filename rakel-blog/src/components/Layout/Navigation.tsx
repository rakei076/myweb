import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { navigationItems } from '../../data/navigation';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const NavigationContainer = styled.div`
  height: 100vh;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

const NavigationTitle = styled.h2`
  font-size: 18px;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
  font-family: ${theme.fonts.chinese};
  text-align: center;
`;

const NavigationList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const NavigationItem = styled(motion.div)<{ $isActive: boolean }>`
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background-color: ${props => props.$isActive ? theme.colors.accent : 'transparent'};
  transition: background-color 0.3s ease;
`;

const NavigationLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  color: ${props => props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.secondary};
  }
`;

const IconWrapper = styled.div`
  margin-right: ${theme.spacing.md};
  display: flex;
  align-items: center;
`;

const NavigationText = styled.span`
  font-size: 14px;
  font-family: ${theme.fonts.chinese};
`;

const PageIndicator = styled.div`
  margin-top: auto;
  padding: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 12px;
  font-family: ${theme.fonts.chinese};
`;

export const Navigation: React.FC = () => {
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={18} /> : null;
  };

  return (
    <NavigationContainer>
      <NavigationTitle>页面导航</NavigationTitle>
      
      <NavigationList>
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavigationItem
              key={item.id}
              $isActive={isActive}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <NavigationLink to={item.path} $isActive={isActive}>
                <IconWrapper>
                  {getIcon(item.icon)}
                </IconWrapper>
                <NavigationText>{item.title}</NavigationText>
              </NavigationLink>
            </NavigationItem>
          );
        })}
      </NavigationList>
      
      <PageIndicator>
        Rakel's Blog
        <br />
        Made with ❤️
      </PageIndicator>
    </NavigationContainer>
  );
};

