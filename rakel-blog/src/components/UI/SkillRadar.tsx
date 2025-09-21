/**
 * 技能雷达图组件
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Skill } from '../../types';

const SVGContainer = styled.svg`
  max-width: 400px;
  width: 100%;
  height: auto;
`;

interface SkillRadarProps {
  skills: Skill[];
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills }) => {
  // 选择前6个技能展示在雷达图上
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 6);

  const size = 400;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / topSkills.length;

  // 计算多边形顶点坐标
  const getPolygonPoints = (level: number) => {
    return topSkills
      .map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (radius * level) / 100;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        return `${x},${y}`;
      })
      .join(' ');
  };

  // 计算标签位置
  const getLabelPosition = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const labelRadius = radius + 30;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;
    return { x, y };
  };

  return (
    <SVGContainer viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={theme.colors.primaryDark} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* 背景网格 */}
      <g opacity="0.2">
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={getPolygonPoints(level)}
            fill="none"
            stroke={theme.colors.border}
            strokeWidth="1"
          />
        ))}
      </g>

      {/* 轴线 */}
      {topSkills.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x2 = center + Math.cos(angle) * radius;
        const y2 = center + Math.sin(angle) * radius;
        return (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={x2}
            y2={y2}
            stroke={theme.colors.border}
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}

      {/* 技能多边形 */}
      <polygon
        points={topSkills
          .map((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const r = (radius * skill.level) / 100;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            return `${x},${y}`;
          })
          .join(' ')}
        fill="url(#skillGradient)"
        stroke={theme.colors.primary}
        strokeWidth="2"
        opacity="0.7"
      />

      {/* 技能点 */}
      {topSkills.map((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (radius * skill.level) / 100;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        return (
          <circle
            key={skill.id}
            cx={x}
            cy={y}
            r="4"
            fill={theme.colors.primary}
            stroke={theme.colors.background}
            strokeWidth="2"
          />
        );
      })}

      {/* 标签 */}
      {topSkills.map((skill, index) => {
        const { x, y } = getLabelPosition(index);
        return (
          <text
            key={skill.id}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill={theme.colors.text}
            fontWeight={theme.fontWeight.medium}
          >
            {skill.name}
            <tspan
              x={x}
              dy="16"
              fontSize="12"
              fill={theme.colors.textSecondary}
            >
              {skill.level}%
            </tspan>
          </text>
        );
      })}
    </SVGContainer>
  );
};

export default SkillRadar;