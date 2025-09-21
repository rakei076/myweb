/**
 * 成长轨迹页面
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { timeline } from '../../data/timeline';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: ${theme.spacing.xl} 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.colors.border};
    transform: translateX(-50%);

    @media (max-width: ${theme.breakpoints.md}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ $align: 'left' | 'right' }>`
  position: relative;
  width: 50%;
  padding: ${theme.spacing.lg};
  ${props => props.$align === 'left' ? 'padding-right: 40px;' : 'padding-left: 40px; margin-left: 50%;'}

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    padding-left: 60px;
    padding-right: ${theme.spacing.lg};
    margin-left: 0;
  }
`;

const TimelineCard = styled.div<{ $color?: string }>`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$color || theme.colors.primary};
    border-radius: ${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg};
  }
`;

const TimelineDot = styled.div<{ $color?: string }>`
  position: absolute;
  top: ${theme.spacing.lg};
  width: 20px;
  height: 20px;
  background: ${props => props.$color || theme.colors.primary};
  border: 4px solid ${theme.colors.background};
  border-radius: 50%;
  box-shadow: ${theme.shadows.sm};
  z-index: 1;
`;

const TimelineDate = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
`;

const TimelineTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
`;

const TimelineDescription = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeight.relaxed};
`;

const TimelinePage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>成长轨迹 📅</PageTitle>
      
      <TimelineContainer>
        {timeline.map((event, index) => {
          const align = index % 2 === 0 ? 'left' : 'right';
          const dotPosition = align === 'left' ? { right: '-50px' } : { left: '-50px' };
          
          return (
            <TimelineItem
              key={event.id}
              $align={align}
              initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TimelineDot $color={event.color} style={dotPosition} />
              <TimelineCard $color={event.color}>
                <TimelineDate>{event.date}</TimelineDate>
                <TimelineTitle>
                  {event.icon && <span>{event.icon} </span>}
                  {event.title}
                </TimelineTitle>
                <TimelineDescription>{event.description}</TimelineDescription>
              </TimelineCard>
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </PageContainer>
  );
};

export default TimelinePage;