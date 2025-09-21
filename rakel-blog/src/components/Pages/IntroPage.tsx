/**
 * 自我介绍页面
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// 页面容器
const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

// 页面标题
const PageTitle = styled(motion.h1)`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, transparent 100%);
    border-radius: ${theme.borderRadius.sm};
  }
`;

// 介绍卡片
const IntroCard = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

// 问候语
const Greeting = styled.h2`
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;

// 自我描述
const Description = styled.p`
  font-size: ${theme.fontSize.lg};
  line-height: ${theme.lineHeight.relaxed};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.lg};
`;

// 信息网格
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
`;

// 信息卡片
const InfoCard = styled(motion.div)`
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.color || theme.colors.primary};
  }
`;

// 信息标题
const InfoTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

// 信息内容
const InfoContent = styled.div`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeight.relaxed};
`;

// 标签容器
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

// 标签
const Tag = styled.span<{ $color?: string }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${props => props.$color || theme.colors.tag.blue};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeight.medium};
`;

// 引用块
const Quote = styled.blockquote`
  background: linear-gradient(135deg, ${theme.colors.backgroundSecondary} 0%, ${theme.colors.background} 100%);
  border-left: 4px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
  font-style: italic;
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textSecondary};
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 60px;
    color: ${theme.colors.primary};
    opacity: 0.2;
  }
`;

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

const IntroPage: React.FC = () => {
  return (
    <PageContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <PageTitle variants={itemVariants}>
          Hello, World! 👋
        </PageTitle>

        <IntroCard variants={itemVariants}>
          <Greeting>你好，我是 Rakel！</Greeting>
          <Description>
            欢迎来到我的个人网站！我是一名正在日本留学的大二学生，主修计算机科学。
            这里是我记录学习、分享经验、展示作品的小天地。
          </Description>
          <Description>
            我热爱编程，享受解决问题的过程，喜欢探索新技术。同时，我也是一个游戏爱好者，
            喜欢在空闲时间玩游戏放松，或者和朋友一起探索这个世界。
          </Description>
          
          <Quote>
            "代码是诗歌，而我正在学习如何优雅地书写。"
          </Quote>
        </IntroCard>

        <InfoGrid>
          <InfoCard variants={itemVariants} color="#07C160">
            <InfoTitle>
              <span>🎓</span> 教育背景
            </InfoTitle>
            <InfoContent>
              <p><strong>学校：</strong>日本某大学</p>
              <p><strong>专业：</strong>计算机科学</p>
              <p><strong>年级：</strong>大学二年级</p>
              <p><strong>预期毕业：</strong>2027年</p>
            </InfoContent>
          </InfoCard>

          <InfoCard variants={itemVariants} color="#FF9500">
            <InfoTitle>
              <span>💡</span> 兴趣方向
            </InfoTitle>
            <InfoContent>
              <TagContainer>
                <Tag $color={theme.colors.tag.blue}>Web 开发</Tag>
                <Tag $color={theme.colors.tag.green}>人工智能</Tag>
                <Tag $color={theme.colors.tag.yellow}>游戏开发</Tag>
                <Tag $color={theme.colors.tag.purple}>UI/UX 设计</Tag>
                <Tag $color={theme.colors.tag.red}>开源项目</Tag>
              </TagContainer>
            </InfoContent>
          </InfoCard>

          <InfoCard variants={itemVariants} color="#3B82F6">
            <InfoTitle>
              <span>🌏</span> 语言能力
            </InfoTitle>
            <InfoContent>
              <p><strong>中文：</strong>母语</p>
              <p><strong>日语：</strong>N2 水平</p>
              <p><strong>英语：</strong>CET-6</p>
            </InfoContent>
          </InfoCard>

          <InfoCard variants={itemVariants} color="#10B981">
            <InfoTitle>
              <span>🎯</span> 当前目标
            </InfoTitle>
            <InfoContent>
              <p>• 深入学习 React 和 TypeScript</p>
              <p>• 参与开源项目贡献</p>
              <p>• 提升日语交流能力</p>
              <p>• 完成个人作品集</p>
            </InfoContent>
          </InfoCard>

          <InfoCard variants={itemVariants} color="#8B5CF6">
            <InfoTitle>
              <span>🎮</span> 爱好
            </InfoTitle>
            <InfoContent>
              <TagContainer>
                <Tag>王者荣耀</Tag>
                <Tag>明日方舟</Tag>
                <Tag>编程</Tag>
                <Tag>旅行</Tag>
                <Tag>摄影</Tag>
                <Tag>看电影</Tag>
              </TagContainer>
            </InfoContent>
          </InfoCard>

          <InfoCard variants={itemVariants} color="#EC4899">
            <InfoTitle>
              <span>📧</span> 联系方式
            </InfoTitle>
            <InfoContent>
              <p><strong>GitHub：</strong>rakei076</p>
              <p><strong>邮箱：</strong>rakel@example.com</p>
              <p><strong>微信：</strong>rakel_wx</p>
            </InfoContent>
          </InfoCard>
        </InfoGrid>
      </motion.div>
    </PageContainer>
  );
};

export default IntroPage;