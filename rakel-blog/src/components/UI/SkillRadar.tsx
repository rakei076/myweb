import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Skill } from '../../types';
import { theme } from '../../styles/theme';

interface SkillRadarProps {
  skills: Skill[];
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills }) => {
  // 获取每个类别的平均技能水平
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  const data = categories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category);
    const average = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
    
    return {
      category: category,
      level: Math.round(average),
    };
  });
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid 
          stroke={theme.colors.border}
          strokeDasharray="3 3"
        />
        <PolarAngleAxis 
          dataKey="category"
          tick={{ fill: theme.colors.text, fontSize: 14 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: theme.colors.textLight, fontSize: 12 }}
        />
        <Radar
          name="技能水平"
          dataKey="level"
          stroke={theme.colors.primary}
          fill={theme.colors.primary}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadar;