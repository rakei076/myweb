/**
 * 作品展示页面
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { projects } from '../../data/projects';

// 页面容器
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// 页面标题
const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

// 副标题
const Subtitle = styled.p`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

// 筛选器容器
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
  flex-wrap: wrap;
`;

// 筛选按钮
const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.textWhite : theme.colors.textSecondary};
  border: 2px solid ${props => props.$isActive ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${props => props.$isActive ? theme.colors.textWhite : theme.colors.primary};
  }
`;

// 项目网格
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

// 项目卡片
const ProjectCard = styled(motion.div)<{ $featured?: boolean }>`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  position: relative;
  ${props => props.$featured && `
    grid-column: span 2;
    
    @media (max-width: ${theme.breakpoints.lg}) {
      grid-column: span 1;
    }
  `}

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

// 项目缩略图容器
const ThumbnailContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: ${theme.colors.backgroundSecondary};
`;

// 项目缩略图
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

// 特色标签
const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.warning};
  color: ${theme.colors.textWhite};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

// 状态标签
const StatusBadge = styled.div<{ $status: string }>`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  background: ${props => {
    switch (props.$status) {
      case 'completed': return theme.colors.success;
      case 'in-progress': return theme.colors.info;
      case 'planned': return theme.colors.textLight;
      default: return theme.colors.textLight;
    }
  }};
  color: ${theme.colors.textWhite};
`;

// 项目内容
const ProjectContent = styled.div`
  padding: ${theme.spacing.lg};
`;

// 项目标题
const ProjectTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

// 项目描述
const ProjectDescription = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 技术栈容器
const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

// 技术标签
const TechTag = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textSecondary};
`;

// 链接容器
const LinkContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

// 链接按钮
const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  text-decoration: none;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

// 项目详情模态框背景
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.xl};
`;

// 项目详情模态框
const Modal = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

// 关闭按钮
const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.xl};
  z-index: 1;

  &:hover {
    background: ${theme.colors.backgroundGrey};
  }
`;

// 模态框内容
const ModalContent = styled.div`
  padding: ${theme.spacing.xxl};
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filters = [
    { id: 'all', label: '全部' },
    { id: 'completed', label: '已完成' },
    { id: 'in-progress', label: '进行中' },
    { id: 'planned', label: '计划中' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.status === filter);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '开发中';
      case 'planned': return '计划中';
      default: return status;
    }
  };

  return (
    <PageContainer>
      <PageTitle>作品展示 💼</PageTitle>
      <Subtitle>这些是我的一些项目作品，点击卡片了解更多详情</Subtitle>

      <FilterContainer>
        {filters.map(f => (
          <FilterButton
            key={f.id}
            $isActive={filter === f.id}
            onClick={() => setFilter(f.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f.label}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            $featured={project.featured}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
            whileHover={{ y: -8 }}
          >
            <ThumbnailContainer>
              <Thumbnail 
                src={project.thumbnail || `https://via.placeholder.com/400x200?text=${project.title}`} 
                alt={project.title} 
              />
              <StatusBadge $status={project.status}>
                {getStatusLabel(project.status)}
              </StatusBadge>
              {project.featured && <FeaturedBadge>⭐ 精选</FeaturedBadge>}
            </ThumbnailContainer>
            
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <TechStack>
                {project.technologies.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechStack>

              <LinkContainer>
                {project.github && (
                  <LinkButton 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>🐙</span> GitHub
                  </LinkButton>
                )}
                {project.demo && (
                  <LinkButton 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>🌐</span> 演示
                  </LinkButton>
                )}
              </LinkContainer>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectGrid>

      {/* 项目详情模态框 */}
      <AnimatePresence>
        {selectedProject && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <Modal
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>✕</CloseButton>
              <ModalContent>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                {/* 这里可以添加更多项目详情 */}
              </ModalContent>
            </Modal>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default ProjectsPage;