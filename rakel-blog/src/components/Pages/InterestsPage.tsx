import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { interestsData } from '../../data/interests';
import { Interest } from '../../types';
import * as Icons from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => props.$isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${props => props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.xl};
`;

const InterestCard = styled(motion.div)`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const CategoryBadge = styled.div<{ $category: Interest['category'] }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.$category) {
      case 'game': return '#FFE4E1';
      case 'tech': return '#E3F2FD';
      case 'life': return '#E8F5E8';
      default: return theme.colors.accent;
    }
  }};
  color: ${props => {
    switch (props.$category) {
      case 'game': return '#D32F2F';
      case 'tech': return '#1976D2';
      case 'life': return '#388E3C';
      default: return theme.colors.text.primary;
    }
  }};
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  color: white;
`;

const InterestName = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const InterestDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  font-size: 0.95rem;
`;

const SkillLevel = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SkillLevelLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const LevelText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`;

const LevelValue = styled.span`
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const AchievementTag = styled.span`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
`;

const categoryLabels = {
  all: '全部',
  game: '游戏',
  tech: '技术',
  life: '生活'
};

export const InterestsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | Interest['category']>('all');

  const filteredInterests = activeFilter === 'all' 
    ? interestsData 
    : interestsData.filter(interest => interest.category === activeFilter);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>兴趣爱好</Title>
        <Subtitle>
          这里记录了我在游戏、技术和生活方面的各种兴趣爱好，
          以及在这些领域的熟练程度和小小成就。
        </Subtitle>
      </Header>

      <FilterTabs>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <FilterTab
            key={key}
            $isActive={activeFilter === key}
            onClick={() => setActiveFilter(key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </FilterTab>
        ))}
      </FilterTabs>

      <AnimatePresence mode="wait">
        <InterestsGrid>
          {filteredInterests.map((interest, index) => (
            <InterestCard
              key={interest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <CategoryBadge $category={interest.category}>
                {categoryLabels[interest.category]}
              </CategoryBadge>
              
              <IconWrapper>
                {getIcon(interest.icon)}
              </IconWrapper>
              
              <InterestName>{interest.name}</InterestName>
              <InterestDescription>{interest.description}</InterestDescription>
              
              <SkillLevel>
                <SkillLevelLabel>
                  <LevelText>熟练程度</LevelText>
                  <LevelValue>{interest.level}/5</LevelValue>
                </SkillLevelLabel>
                <ProgressBar>
                  <ProgressFill
                    $level={interest.level}
                    initial={{ width: 0 }}
                    animate={{ width: `${(interest.level / 5) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  />
                </ProgressBar>
              </SkillLevel>
              
              {interest.achievements && interest.achievements.length > 0 && (
                <AchievementsList>
                  {interest.achievements.map((achievement, i) => (
                    <AchievementTag key={i}>{achievement}</AchievementTag>
                  ))}
                </AchievementsList>
              )}
            </InterestCard>
          ))}
        </InterestsGrid>
      </AnimatePresence>
    </PageContainer>
  );
};

