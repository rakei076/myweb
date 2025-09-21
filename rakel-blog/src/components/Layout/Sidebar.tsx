/**
 * 侧边栏组件
 * 显示个人信息概览
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { PersonalInfo } from '../../types';

// 侧边栏容器
const SidebarContainer = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
`;

// 头像容器
const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  position: relative;
`;

// 头像
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.colors.backgroundSecondary};
  box-shadow: ${theme.shadows.md};
`;

// 状态指示器
const StatusIndicator = styled(motion.div)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: ${theme.colors.success};
  border-radius: 50%;
  border: 3px solid ${theme.colors.background};
  box-shadow: ${theme.shadows.sm};
`;

// 姓名
const Name = styled.h2`
  text-align: center;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

// 昵称
const Nickname = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
`;

// 状态文本
const Status = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;
`;

// 信息列表
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

// 信息项
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
`;

// 图标
const Icon = styled.span`
  font-size: ${theme.fontSize.base};
  width: 20px;
  text-align: center;
`;

// 联系方式容器
const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
`;

// 联系方式按钮
const ContactButton = styled.a`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 50%;
  color: ${theme.colors.textSecondary};
  transition: ${theme.transitions.fast};
  font-size: ${theme.fontSize.base};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.textWhite};
    transform: translateY(-2px);
  }
`;

// 状态动画
const statusAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 默认个人信息
const defaultPersonalInfo: PersonalInfo = {
  name: 'Rakel',
  nickname: '瑞可',
  status: '正在探索代码的世界',
  location: '日本',
  education: {
    level: '本科',
    school: '日本某大学',
    major: '计算机科学',
    year: 2,
  },
  contacts: {
    email: 'rakel@example.com',
    wechat: 'rakel_wx',
    github: 'rakei076',
  },
  bio: '一个热爱技术和生活的留学生，喜欢探索新事物，享受编程的乐趣。',
};

interface SidebarProps {
  personalInfo?: PersonalInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ personalInfo = defaultPersonalInfo }) => {
  return (
    <SidebarContainer>
      {/* 头像 */}
      <AvatarContainer>
        <Avatar 
          src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Rakel" 
          alt={personalInfo.name} 
        />
        <StatusIndicator
          animate={statusAnimation.animate}
        />
      </AvatarContainer>

      {/* 基本信息 */}
      <Name>{personalInfo.name}</Name>
      <Nickname>@{personalInfo.nickname}</Nickname>
      <Status>"{personalInfo.status}"</Status>

      {/* 详细信息 */}
      <InfoList>
        <InfoItem>
          <Icon>📍</Icon>
          <span>{personalInfo.location}</span>
        </InfoItem>
        <InfoItem>
          <Icon>🎓</Icon>
          <span>{personalInfo.education.school}</span>
        </InfoItem>
        <InfoItem>
          <Icon>📚</Icon>
          <span>{personalInfo.education.major} · 大{personalInfo.education.year}</span>
        </InfoItem>
      </InfoList>

      {/* 联系方式 */}
      <ContactContainer>
        {personalInfo.contacts.github && (
          <ContactButton 
            href={`https://github.com/${personalInfo.contacts.github}`}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Icon>🐙</Icon>
          </ContactButton>
        )}
        {personalInfo.contacts.email && (
          <ContactButton 
            href={`mailto:${personalInfo.contacts.email}`}
            title="Email"
          >
            <Icon>📧</Icon>
          </ContactButton>
        )}
        {personalInfo.contacts.wechat && (
          <ContactButton 
            href="#"
            title={`WeChat: ${personalInfo.contacts.wechat}`}
          >
            <Icon>💬</Icon>
          </ContactButton>
        )}
      </ContactContainer>
    </SidebarContainer>
  );
};

export default Sidebar;