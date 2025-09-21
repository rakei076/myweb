import React from 'react';
import styled from 'styled-components';
import { timelineItems } from '../../data/timeline';
import { theme } from '../../styles/theme';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  min-height: calc(100vh - 60px);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  font-size: ${theme.fontSizes['3xl']};
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.secondary});
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div<{ align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-end' : 'flex-start'};
  padding: ${theme.spacing.lg} 0;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineContent = styled.div<{ align: 'left' | 'right' }>`
  width: 45%;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.align === 'left' ? 'right: -8px' : 'left: -8px'};
    transform: translateY(-50%) rotate(45deg);
    width: 16px;
    height: 16px;
    background-color: ${theme.colors.surface};
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: -8px;
    }
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const TimelineDot = styled.div<{ type: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => 
    props.type === 'work' ? theme.colors.primary :
    props.type === 'education' ? theme.colors.secondary :
    theme.colors.accent
  };
  border: 3px solid ${theme.colors.background};
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 20px;
  }
`;

const TimelineDate = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`;

const TimelineTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const TimelineDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  line-height: 1.6;
`;

const TimelineTypeTag = styled.span<{ type: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  margin-top: ${theme.spacing.md};
  background-color: ${props => 
    props.type === 'work' ? 'rgba(0, 102, 204, 0.1)' :
    props.type === 'education' ? 'rgba(0, 168, 107, 0.1)' :
    'rgba(255, 107, 107, 0.1)'
  };
  color: ${props => 
    props.type === 'work' ? theme.colors.primary :
    props.type === 'education' ? theme.colors.secondary :
    theme.colors.accent
  };
`;

const TimelinePage: React.FC = () => {
  return (
    <Container>
      <Title>我的时间线</Title>
      <TimelineContainer>
        {timelineItems.map((item, index) => {
          const align = index % 2 === 0 ? 'left' : 'right';
          return (
            <TimelineItem key={item.id} align={align}>
              <TimelineDot type={item.type} />
              <TimelineContent align={align}>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineDescription>{item.description}</TimelineDescription>
                <TimelineTypeTag type={item.type}>
                  {item.type === 'work' ? '工作' : 
                   item.type === 'education' ? '教育' : '成就'}
                </TimelineTypeTag>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </Container>
  );
};

export default TimelinePage;