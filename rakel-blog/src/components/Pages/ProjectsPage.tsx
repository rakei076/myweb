import React from 'react';
import styled from 'styled-components';
import { projects } from '../../data/projects';
import { theme } from '../../styles/theme';

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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ProjectCard = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
`;

const ProjectContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const ProjectTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const TechTag = styled.span`
  background-color: rgba(0, 102, 204, 0.1);
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ProjectLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const ProjectsPage: React.FC = () => {
  const projectIcons = ['🚀', '📱', '📊', '🛒'];
  
  return (
    <Container>
      <Title>我的项目</Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={project.id}>
            <ProjectImage>
              {projectIcons[index % projectIcons.length]}
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map(tech => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
              <ProjectLinks>
                {project.github && (
                  <ProjectLink href={project.github} target="_blank">
                    🔗 GitHub
                  </ProjectLink>
                )}
                {project.demo && (
                  <ProjectLink href={project.demo} target="_blank">
                    🌐 演示
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default ProjectsPage;