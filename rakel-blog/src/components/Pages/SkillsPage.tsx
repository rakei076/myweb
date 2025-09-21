import React from 'react';
import styled from 'styled-components';
import { skills } from '../../data/skills';
import { theme } from '../../styles/theme';
import SkillRadar from '../UI/SkillRadar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  min-height: calc(100vh - 60px);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  font-size: ${theme.fontSizes['3xl']};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const CategorySection = styled.div`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const CategoryTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.xl};
`;

const SkillItem = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.md};
`;

const SkillBar = styled.div`
  height: 8px;
  background-color: ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const SkillProgress = styled.div<{ level: number }>`
  height: 100%;
  width: ${props => props.level}%;
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  border-radius: ${theme.borderRadius.full};
  transition: width 1s ease;
  animation: slideIn 1s ease;
  
  @keyframes slideIn {
    from { width: 0; }
    to { width: ${props => props.level}%; }
  }
`;

const RadarContainer = styled.div`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SkillsPage: React.FC = () => {
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  return (
    <Container>
      <Title>我的技能</Title>
      <SkillsGrid>
        <SkillCategories>
          {categories.map(category => (
            <CategorySection key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              {skills
                .filter(skill => skill.category === category)
                .map(skill => (
                  <SkillItem key={skill.name}>
                    <SkillName>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress level={skill.level} />
                    </SkillBar>
                  </SkillItem>
                ))}
            </CategorySection>
          ))}
        </SkillCategories>
        <RadarContainer>
          <h3>技能雷达图</h3>
          <SkillRadar skills={skills} />
        </RadarContainer>
      </SkillsGrid>
    </Container>
  );
};

export default SkillsPage;