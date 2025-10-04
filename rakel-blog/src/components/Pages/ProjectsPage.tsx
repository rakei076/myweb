import { useState, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projects';
import { Github, ExternalLink, Star, Code } from 'lucide-react';

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

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => props.$isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${props => props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ProjectCard = styled(motion.div)`
  height: 400px;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled(motion.div)<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const CardFront = styled(CardFace)`
  background-color: ${theme.colors.primary};
`;

const CardBack = styled(CardFace)`
  background-color: ${theme.colors.secondary};
  transform: rotateY(180deg);
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectImage = styled.div<{ $image: string }>`
  height: 200px;
  background: ${props => props.$image ? `url(${props.$image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  }
`;

const ImagePlaceholder = styled.div`
  color: white;
  font-size: 3.2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    line-height: 1;
  }
`;

const ProjectInfo = styled.div`
  padding: ${theme.spacing.xl};
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const TechTag = styled.span`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const BackContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const BackDescription = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: auto;
`;

const ActionButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &.github {
    background-color: #24292e;
    color: white;
  }

  &.live {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

const FlipHint = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  z-index: 2;
`;

export const ProjectsPage: FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.featured);

  const handleCardFlip = (projectId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>作品展示</Title>
        <Subtitle>
          这里展示了我在学习和实践过程中完成的各种项目，
          涵盖前端、后端、移动端等不同技术栈的应用开发。
        </Subtitle>
      </Header>

      <FilterSection>
        <FilterButton
          $isActive={filter === 'all'}
          onClick={() => setFilter('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          全部项目
        </FilterButton>
        <FilterButton
          $isActive={filter === 'featured'}
          onClick={() => setFilter('featured')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          精选项目
        </FilterButton>
      </FilterSection>

      <AnimatePresence mode="wait">
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardFlip(project.id)}
            >
              <CardInner $isFlipped={flippedCards.has(project.id)}>
                <CardFront>
                  {project.featured && (
                    <FeaturedBadge>
                      <Star size={14} />
                      精选
                    </FeaturedBadge>
                  )}
                  <ProjectImage $image={project.image}>
                    <ImagePlaceholder>
                      {project.icon ? <span>{project.icon}</span> : <Code />}
                    </ImagePlaceholder>
                  </ProjectImage>
                  <ProjectInfo>
                    <div>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>
                    </div>
                    <TechStack>
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <TechTag key={i}>{tech}</TechTag>
                      ))}
                      {project.technologies.length > 3 && (
                        <TechTag>+{project.technologies.length - 3}</TechTag>
                      )}
                    </TechStack>
                  </ProjectInfo>
                  <FlipHint>点击翻转</FlipHint>
                </CardFront>

                <CardBack>
                  <BackContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <BackDescription>{project.description}</BackDescription>
                    <TechStack>
                      {project.technologies.map((tech, i) => (
                        <TechTag key={i}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  </BackContent>
                  <ActionButtons>
                    {project.githubUrl && (
                      <ActionButton
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                        源码
                      </ActionButton>
                    )}
                    {project.liveUrl && (
                      <ActionButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="live"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                        预览
                      </ActionButton>
                    )}
                  </ActionButtons>
                </CardBack>
              </CardInner>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </AnimatePresence>
    </PageContainer>
  );
};

