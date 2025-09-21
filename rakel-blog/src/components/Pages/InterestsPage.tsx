/**
 * 兴趣爱好页面
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { interests } from '../../data/interests';

// 页面容器
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// 页面标题
const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

// 分类标签容器
const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
  flex-wrap: wrap;
`;

// 分类标签
const CategoryTab = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${props => props.$isActive ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${props => props.$isActive ? theme.colors.textWhite : theme.colors.textSecondary};
  border-radius: ${theme.borderRadius.full};
  border: none;
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.sm};
  }
`;

// 兴趣卡片网格
const InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

// 兴趣卡片
const InterestCard = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.color || theme.colors.primary};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

// 卡片头部
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

// 图标容器
const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.lg};
  font-size: 32px;
`;

// 等级显示
const LevelDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

// 星星
const Star = styled.span<{ $filled: boolean }>`
  font-size: 20px;
  color: ${props => props.$filled ? '#FFD700' : theme.colors.borderLight};
`;

// 兴趣名称
const InterestName = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

// 兴趣描述
const InterestDescription = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.md};
`;

// 成就容器
const AchievementContainer = styled.div`
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

// 成就标题
const AchievementTitle = styled.h4`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
`;

// 成就列表
const AchievementList = styled.ul`
  list-style: none;
`;

// 成就项
const AchievementItem = styled.li`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.xs} 0;
  position: relative;
  padding-left: ${theme.spacing.lg};

  &::before {
    content: '🏆';
    position: absolute;
    left: 0;
  }
`;

// 最近动态
const RecentActivity = styled.div`
  background: ${theme.colors.tag.green};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
`;

// 进度条容器
const ProgressContainer = styled.div`
  margin-top: ${theme.spacing.md};
`;

// 进度条标签
const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xs};
`;

// 进度条
const ProgressBar = styled.div`
  height: 8px;
  background: ${theme.colors.backgroundGrey};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

// 进度条填充
const ProgressFill = styled(motion.div)<{ $level: number; $color?: string }>`
  height: 100%;
  background: ${props => props.$color || theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
`;

// 动画配置
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const InterestsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部', color: theme.colors.primary },
    { id: 'game', label: '游戏', color: '#FF9500' },
    { id: 'tech', label: '技术', color: '#3B82F6' },
    { id: 'life', label: '生活', color: '#10B981' },
  ];

  const filteredInterests = activeCategory === 'all' 
    ? interests 
    : interests.filter(interest => interest.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game': return '#FF9500';
      case 'tech': return '#3B82F6';
      case 'life': return '#10B981';
      default: return theme.colors.primary;
    }
  };

  return (
    <PageContainer>
      <PageTitle>我的兴趣爱好 🎨</PageTitle>

      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            $isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <InterestGrid>
        {filteredInterests.map((interest, index) => (
          <InterestCard
            key={interest.id}
            color={getCategoryColor(interest.category)}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <CardHeader>
              <IconContainer>{interest.icon}</IconContainer>
              {interest.level && (
                <LevelDisplay>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} $filled={i < interest.level!}>
                      ★
                    </Star>
                  ))}
                </LevelDisplay>
              )}
            </CardHeader>

            <InterestName>{interest.name}</InterestName>
            {interest.description && (
              <InterestDescription>{interest.description}</InterestDescription>
            )}

            {interest.level && (
              <ProgressContainer>
                <ProgressLabel>
                  <span>熟练度</span>
                  <span>{interest.level * 20}%</span>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill
                    $level={interest.level}
                    $color={getCategoryColor(interest.category)}
                    initial={{ width: 0 }}
                    animate={{ width: `${interest.level * 20}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </ProgressBar>
              </ProgressContainer>
            )}

            {interest.achievements && interest.achievements.length > 0 && (
              <AchievementContainer>
                <AchievementTitle>成就</AchievementTitle>
                <AchievementList>
                  {interest.achievements.map((achievement, i) => (
                    <AchievementItem key={i}>{achievement}</AchievementItem>
                  ))}
                </AchievementList>
              </AchievementContainer>
            )}

            {interest.recent && (
              <RecentActivity>
                📅 最近：{interest.recent}
              </RecentActivity>
            )}
          </InterestCard>
        ))}
      </InterestGrid>
    </PageContainer>
  );
};

export default InterestsPage;