import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '../../data/timeline';
import { TimelineEvent } from '../../types';
import * as Icons from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PageContainer = styled.div`
  max-width: 800px;
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
  margin-bottom: ${theme.spacing.xxl};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
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

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
  }
`;

const TimelineItemContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.xxl};
`;

const TimelineNode = styled(motion.div)<{ $type: TimelineEvent['type'] }>`
  position: absolute;
  left: -20px;
  top: 24px;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.round};
  background-color: ${props => {
    switch (props.$type) {
      case 'education': return '#4CAF50';
      case 'project': return '#2196F3';
      case 'achievement': return '#FF9800';
      case 'milestone': return '#9C27B0';
      default: return theme.colors.accent;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: ${theme.shadows.md};
  z-index: 2;
`;

const TimelineCard = styled(motion.div)`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-left: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 24px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${theme.colors.secondary};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const CardDate = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
`;

const CardDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const TypeBadge = styled.div<{ $type: TimelineEvent['type'] }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: ${theme.spacing.md};
  background-color: ${props => {
    switch (props.$type) {
      case 'education': return '#E8F5E8';
      case 'project': return '#E3F2FD';
      case 'achievement': return '#FFF3E0';
      case 'milestone': return '#F3E5F5';
      default: return theme.colors.accent;
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'education': return '#2E7D32';
      case 'project': return '#1565C0';
      case 'achievement': return '#EF6C00';
      case 'milestone': return '#7B1FA2';
      default: return theme.colors.text.primary;
    }
  }};
`;

const typeLabels = {
  all: '全部',
  education: '教育',
  project: '项目',
  achievement: '成就',
  milestone: '里程碑'
};

const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <TimelineItemContainer ref={ref}>
      <TimelineNode
        $type={event.type}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      >
        {getIcon(event.icon)}
      </TimelineNode>
      
      <TimelineCard
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1 + 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDate>
            {new Date(event.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long'
            })}
          </CardDate>
        </CardHeader>
        
        <CardDescription>{event.description}</CardDescription>
        
        <TypeBadge $type={event.type}>
          {getIcon(event.icon)}
          {typeLabels[event.type]}
        </TypeBadge>
      </TimelineCard>
    </TimelineItemContainer>
  );
};

export const TimelinePage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | TimelineEvent['type']>('all');

  const filteredEvents = filter === 'all' 
    ? timelineData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : timelineData
        .filter(event => event.type === filter)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>成长时间轴</Title>
        <Subtitle>
          记录我从高中毕业到现在的重要时刻和成长历程，
          每一个节点都见证着我在学习和技术道路上的进步。
        </Subtitle>
      </Header>

      <FilterSection>
        {Object.entries(typeLabels).map(([key, label]) => (
          <FilterButton
            key={key}
            $isActive={filter === key}
            onClick={() => setFilter(key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </FilterButton>
        ))}
      </FilterSection>

      <TimelineContainer>
        <AnimatePresence mode="wait">
          {filteredEvents.map((event, index) => (
            <TimelineItem
              key={`${filter}-${event.id}`}
              event={event}
              index={index}
            />
          ))}
        </AnimatePresence>
      </TimelineContainer>
    </PageContainer>
  );
};