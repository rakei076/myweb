import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Sidebar } from './Sidebar';
import { Navigation } from './Navigation';
import { motion } from 'framer-motion';

interface BinderLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.colors.secondary};
`;

const LeftSidebar = styled.div`
  width: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  box-shadow: ${theme.shadows.md};

  /* 活页夹装饰 */
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const MainContent = styled(motion.div)`
  flex: 1;
  background-color: ${theme.colors.primary};
  margin: 20px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;

  /* 活页夹孔效果 */
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 20px;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 30px,
      ${theme.colors.secondary} 30px,
      ${theme.colors.secondary} 40px
    );
    z-index: 1;
  }
`;

const ContentArea = styled.div`
  padding: ${theme.spacing.xxl};
  margin-left: 20px;
  height: 100%;
  overflow-y: auto;
`;

const RightNavigation = styled.div`
  width: 250px;
  background-color: ${theme.colors.primary};
  margin: 20px 20px 20px 0;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

export const BinderLayout: React.FC<BinderLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <LeftSidebar>
        <Sidebar />
      </LeftSidebar>
      
      <MainContent
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
      
      <RightNavigation>
        <Navigation />
      </RightNavigation>
    </LayoutContainer>
  );
};