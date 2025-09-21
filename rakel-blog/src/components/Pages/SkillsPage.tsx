/**
 * 技术栈页面
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import SkillRadar from '../UI/SkillRadar';
import { skills } from '../../data/skills';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const SkillCategory = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
`;

const CategoryTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;

const SkillItem = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSize.base};
`;

const ProgressBar = styled.div`
  height: 8px;
  background: ${theme.colors.backgroundGrey};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const Progress = styled.div<{ $level: number; $color?: string }>`
  height: 100%;
  width: ${props => props.$level}%;
  background: ${props => props.$color || theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  transition: width 1s ease;
`;

const RadarContainer = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const SkillsPage: React.FC = () => {
  const skillCategories = [
    {
      title: '编程语言',
      category: 'language',
      color: '#3B82F6',
    },
    {
      title: '框架与库',
      category: 'framework',
      color: '#10B981',
    },
    {
      title: '工具',
      category: 'tool',
      color: '#F59E0B',
    },
  ];

  return (
    <PageContainer>
      <PageTitle>技术栈 🛠️</PageTitle>
      
      <SkillsGrid>
        {skillCategories.map(category => (
          <SkillCategory key={category.category}>
            <CategoryTitle>{category.title}</CategoryTitle>
            {skills
              .filter(skill => skill.category === category.category)
              .map(skill => (
                <SkillItem key={skill.id}>
                  <SkillName>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </SkillName>
                  <ProgressBar>
                    <Progress $level={skill.level} $color={category.color} />
                  </ProgressBar>
                </SkillItem>
              ))}
          </SkillCategory>
        ))}
      </SkillsGrid>

      <RadarContainer>
        <SkillRadar skills={skills} />
      </RadarContainer>
    </PageContainer>
  );
};

export default SkillsPage;