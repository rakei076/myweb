import React, { useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillRadarProps {
  skills: Skill[];
  size?: number;
}

interface RadarPoint {
  x: number;
  y: number;
  skill: Skill;
  angle: number;
}

const RadarContainer = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  position: relative;
  margin: 0 auto;
`;

const RadarSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const RadarGrid = styled.g`
  stroke: ${theme.colors.border};
  stroke-width: 1;
  fill: none;
  opacity: 0.5;
`;

const RadarArea = styled(motion.polygon)`
  fill: rgba(102, 126, 234, 0.2);
  stroke: #667eea;
  stroke-width: 2;
`;

const RadarPoint = styled(motion.circle)`
  fill: #667eea;
  stroke: white;
  stroke-width: 2;
  cursor: pointer;
`;

const SkillLabel = styled.text`
  fill: ${theme.colors.text.primary};
  font-size: 12px;
  font-weight: 500;
  text-anchor: middle;
  dominant-baseline: middle;
`;

const Tooltip = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  box-shadow: ${theme.shadows.md};
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -100%);
  margin-top: -10px;
`;

const TooltipContent = styled.div`
  text-align: center;
  font-size: 0.9rem;
`;

const TooltipTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 2px;
`;

const TooltipLevel = styled.div`
  color: ${theme.colors.text.secondary};
`;

export const SkillRadar: React.FC<SkillRadarProps> = ({ skills, size = 300 }) => {
  const [hoveredSkill, setHoveredSkill] = React.useState<{ skill: Skill; x: number; y: number } | null>(null);
  
  const center = size / 2;
  const maxRadius = center - 60;
  
  const radarData = useMemo(() => {
    const points: RadarPoint[] = skills.map((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
      const radius = (skill.level / 10) * maxRadius;
      
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
        skill,
        angle
      };
    });
    
    return points;
  }, [skills, center, maxRadius]);
  
  const polygonPoints = radarData.map(point => `${point.x},${point.y}`).join(' ');
  
  const gridLevels = [2, 4, 6, 8, 10];
  
  return (
    <RadarContainer $size={size}>
      <RadarSvg viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        <RadarGrid>
          {gridLevels.map(level => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={(level / 10) * maxRadius}
            />
          ))}
          
          {/* Grid lines */}
          {radarData.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + Math.cos(point.angle) * maxRadius}
              y2={center + Math.sin(point.angle) * maxRadius}
            />
          ))}
        </RadarGrid>
        
        {/* Skill area */}
        <RadarArea
          points={polygonPoints}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        
        {/* Skill points */}
        {radarData.map((point, index) => (
          <g key={point.skill.id}>
            <RadarPoint
              cx={point.x}
              cy={point.y}
              r={6}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.5 }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const containerRect = e.currentTarget.closest('div')!.getBoundingClientRect();
                setHoveredSkill({
                  skill: point.skill,
                  x: rect.left - containerRect.left + rect.width / 2,
                  y: rect.top - containerRect.top
                });
              }}
              onMouseLeave={() => setHoveredSkill(null)}
            />
            
            {/* Skill labels */}
            <SkillLabel
              x={center + Math.cos(point.angle) * (maxRadius + 25)}
              y={center + Math.sin(point.angle) * (maxRadius + 25)}
            >
              {point.skill.name}
            </SkillLabel>
          </g>
        ))}
      </RadarSvg>
      
      {/* Tooltip */}
      {hoveredSkill && (
        <Tooltip
          $x={hoveredSkill.x}
          $y={hoveredSkill.y}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <TooltipContent>
            <TooltipTitle>{hoveredSkill.skill.name}</TooltipTitle>
            <TooltipLevel>熟练度: {hoveredSkill.skill.level}/10</TooltipLevel>
          </TooltipContent>
        </Tooltip>
      )}
    </RadarContainer>
  );
};

