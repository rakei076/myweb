/**
 * 导航组件
 * 活页夹标签式导航
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { NavigationItem } from '../../types';
import { navigationItems } from '../../data/navigation';

// 导航容器
const NavContainer = styled.nav`
  padding: ${theme.spacing.lg};
  height: calc(100% - 300px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
  }
`;

// 导航标题
const NavTitle = styled.h3`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.md};
  padding: 0 ${theme.spacing.sm};
`;

// 导航列表
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

// 导航项 - 活页夹标签样式
const NavItem = styled(motion.li)<{ $isActive: boolean; $color?: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$color || theme.colors.primary};
    transform: ${props => props.$isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

// 导航按钮
const NavButton = styled.button<{ $isActive: boolean; $color?: string }>`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${props => props.$isActive 
    ? `linear-gradient(90deg, ${props.$color || theme.colors.primary}10 0%, transparent 100%)` 
    : 'transparent'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: ${theme.transitions.fast};
  text-align: left;
  position: relative;

  &:hover {
    background: ${props => props.$isActive 
      ? `linear-gradient(90deg, ${props.$color || theme.colors.primary}10 0%, transparent 100%)`
      : theme.colors.backgroundGrey};
  }

  &::after {
    content: '';
    position: absolute;
    right: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.$color || theme.colors.primary};
    opacity: ${props => props.$isActive ? 1 : 0};
    transition: ${theme.transitions.fast};
  }
`;

// 导航图标
const NavIcon = styled.span<{ $color?: string }>`
  font-size: ${theme.fontSize.xl};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => props.$color ? 'none' : 'grayscale(50%)'};
  transition: ${theme.transitions.fast};
`;

// 导航文本
const NavText = styled.span<{ $isActive: boolean }>`
  font-size: ${theme.fontSize.base};
  font-weight: ${props => props.$isActive ? theme.fontWeight.medium : theme.fontWeight.normal};
  color: ${props => props.$isActive ? theme.colors.text : theme.colors.textSecondary};
  transition: ${theme.transitions.fast};
`;

// 页码
const PageNumber = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  margin-left: auto;
  padding: 2px 6px;
  background: ${theme.colors.backgroundGrey};
  border-radius: ${theme.borderRadius.sm};
`;

// 标签装饰
const TabDecoration = styled.div<{ $color?: string }>`
  position: absolute;
  top: 0;
  right: -20px;
  width: 20px;
  height: 100%;
  background: ${props => props.$color || theme.colors.primary};
  opacity: 0.1;
  transform: skewX(-10deg);
`;

interface NavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <NavContainer>
      <NavTitle>目录</NavTitle>
      <NavList>
        {navigationItems.map((item, index) => (
          <NavItem
            key={item.id}
            $isActive={currentPage === index}
            $color={item.color}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavButton
              $isActive={currentPage === index}
              $color={item.color}
              onClick={() => onPageChange(index)}
            >
              <NavIcon $color={currentPage === index ? item.color : undefined}>
                {item.icon}
              </NavIcon>
              <NavText $isActive={currentPage === index}>
                {item.label}
              </NavText>
              <PageNumber>{String(index + 1).padStart(2, '0')}</PageNumber>
            </NavButton>
            {currentPage === index && <TabDecoration $color={item.color} />}
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default Navigation;