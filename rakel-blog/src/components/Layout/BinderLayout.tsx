/**
 * 活页夹布局组件
 * 实现活页夹风格的页面布局
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

interface BinderLayoutProps {
  children: React.ReactNode;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// 主容器 - 活页夹外壳
const BinderContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  padding: ${theme.spacing.xl};
  perspective: 1500px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

// 活页夹主体
const BinderWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 85vh;
  min-height: 600px;
  background: ${theme.colors.binder.cover};
  border-radius: ${theme.borderRadius.binder};
  box-shadow: ${theme.shadows.xl};
  display: flex;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;

  @media (max-width: ${theme.breakpoints.lg}) {
    max-width: 100%;
    height: 90vh;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 100vh;
    border-radius: 0;
  }
`;

// 左侧装饰边栏 - 活页夹环
const BinderRings = styled.div`
  width: 80px;
  height: 100%;
  background: linear-gradient(90deg, #dcdde1 0%, #f5f6fa 100%);
  border-right: 2px solid ${theme.colors.border};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 60px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

// 活页夹环
const Ring = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c0c0c0 0%, #e0e0e0 50%, #c0c0c0 100%);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ringShine 3s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme.colors.binder.paper};
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 30px;
    height: 30px;

    &::after {
      width: 15px;
      height: 15px;
    }
  }
`;

// 中间内容区域
const ContentArea = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

// 页面内容容器
const PageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: ${theme.colors.binder.paper};
  position: relative;
  padding: ${theme.spacing.xl};
  overflow-y: auto;
  transform-origin: left center;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundSecondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};

    &:hover {
      background: ${theme.colors.textLight};
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

// 页面阴影效果
const PageShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0) 10%
  );
  pointer-events: none;
`;

// 右侧导航区域
const NavigationArea = styled.div`
  width: 280px;
  height: 100%;
  background: ${theme.colors.backgroundSecondary};
  border-left: 1px solid ${theme.colors.border};
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 240px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    z-index: ${theme.zIndex.modal};
    transform: translateX(100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }
`;

// 移动端菜单按钮
const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: ${theme.colors.textWhite};
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.fixed};
  font-size: 24px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// 页面切换动画变体
const pageVariants = {
  enter: {
    rotateY: -90,
    opacity: 0,
    scale: 0.9,
  },
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

const BinderLayout: React.FC<BinderLayoutProps> = ({ 
  children, 
  currentPage = 0,
  onPageChange 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    setPageKey(prev => prev + 1);
  }, [currentPage]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigationClick = (index: number) => {
    if (onPageChange) {
      onPageChange(index);
    }
    setMobileMenuOpen(false);
  };

  return (
    <BinderContainer>
      <BinderWrapper>
        {/* 左侧活页夹环 */}
        <BinderRings>
          <Ring />
          <Ring />
          <Ring />
          <Ring />
          <Ring />
        </BinderRings>

        {/* 中间内容区 */}
        <ContentArea>
          <AnimatePresence mode="wait">
            <PageContainer
              key={pageKey}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <PageShadow />
              {children}
            </PageContainer>
          </AnimatePresence>
        </ContentArea>

        {/* 右侧导航 */}
        <NavigationArea className={mobileMenuOpen ? 'open' : ''}>
          <Sidebar />
          <Navigation 
            currentPage={currentPage} 
            onPageChange={handleNavigationClick} 
          />
        </NavigationArea>

        {/* 移动端菜单按钮 */}
        <MobileMenuButton onClick={handleMobileMenuToggle}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </BinderWrapper>
    </BinderContainer>
  );
};

export default BinderLayout;