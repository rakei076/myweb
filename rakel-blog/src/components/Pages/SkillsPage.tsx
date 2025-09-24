import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { Skill } from '../../types';
import { SkillRadar } from '../UI/SkillRadar';
import * as Icons from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1200px;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RadarSection = styled.div`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
`;

const RadarTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const CategorySection = styled.div``;

const CategoryTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const CategoryTab = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => props.$isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${props => props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
  padding-right: ${theme.spacing.sm};
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.accent};
    transform: translateX(4px);
  }
`;

const SkillIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: ${theme.spacing.lg};
  flex-shrink: 0;
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.h3`
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ProgressBar = styled.div`
  flex: 1;
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

const LevelText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  font-weight: 600;
  min-width: 40px;
`;

const ProjectsSection = styled.div`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
`;

const ProjectsTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ProjectItem = styled.div`
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid #667eea;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const ProjectTechs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const TechTag = styled.span`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
`;

const categoryLabels = {
  all: '全部',
  frontend: '前端',
  backend: '后端',
  tools: '工具',
  languages: '语言'
};

export const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | Skill['category']>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const radarSkills = skillsData.filter(skill => skill.level >= 6).slice(0, 8);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  const getSkillProjects = (skill: Skill) => {
    return projectsData.filter(project => skill.projects.includes(project.id));
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>技术栈</Title>
        <Subtitle>
          这里展示了我在前端、后端、工具和编程语言方面的技能水平，
          以及这些技能在实际项目中的应用情况。
        </Subtitle>
      </Header>

      <ContentGrid>
        <RadarSection>
          <RadarTitle>技能雷达图</RadarTitle>
          <SkillRadar skills={radarSkills} size={350} />
        </RadarSection>

        <CategorySection>
          <CategoryTabs>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <CategoryTab
                key={key}
                $isActive={activeCategory === key}
                onClick={() => setActiveCategory(key as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <AnimatePresence mode="wait">
            <SkillsList>
              {filteredSkills.map((skill, index) => (
                <SkillItem
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <SkillIcon>
                    {getIcon(skill.icon)}
                  </SkillIcon>
                  
                  <SkillInfo>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>
                      <ProgressBar>
                        <ProgressFill
                          $level={skill.level}
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.level / 10) * 100}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                        />
                      </ProgressBar>
                      <LevelText>{skill.level}/10</LevelText>
                    </SkillLevel>
                  </SkillInfo>
                </SkillItem>
              ))}
            </SkillsList>
          </AnimatePresence>
        </CategorySection>
      </ContentGrid>

      {selectedSkill && (
        <ProjectsSection>
          <ProjectsTitle>
            {selectedSkill.name} 相关项目
          </ProjectsTitle>
          
          {getSkillProjects(selectedSkill).length > 0 ? (
            <ProjectsList>
              {getSkillProjects(selectedSkill).map((project) => (
                <ProjectItem key={project.id}>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectTechs>
                    {project.technologies.map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                  </ProjectTechs>
                </ProjectItem>
              ))}
            </ProjectsList>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: theme.colors.text.secondary,
              padding: theme.spacing.xl 
            }}>
              暂无相关项目展示
            </div>
          )}
        </ProjectsSection>
      )}
    </PageContainer>
  );
};

