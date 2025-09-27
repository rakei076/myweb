import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, MapPin, GraduationCap, Calendar } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Avatar = styled(motion.div)`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.round};
  margin: 0 auto ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  font-weight: bold;
  box-shadow: ${theme.shadows.lg};
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.english};
`;

const Title = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const InfoCard = styled(motion.div)`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const InfoList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
`;

const ContactCard = styled(InfoCard)`
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentGreen} 100%);
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: ${theme.colors.text.primary};
    transform: translateX(4px);
  }
`;

const BioSection = styled(motion.div)`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const BioTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const BioText = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.8;
  font-size: 1rem;
`;

export const IntroPage: React.FC = () => {
  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Avatar
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          R
        </Avatar>
        <Name>Rakel</Name>
        <Title>日本留学生 · 大二在读 · 技术爱好者</Title>
      </Header>

      <InfoGrid>
        <InfoCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InfoTitle>
            <GraduationCap size={24} />
            基本信息
          </InfoTitle>
          <InfoList>
            <InfoItem>
              <MapPin size={18} />
              <span>日本 · 留学中</span>
            </InfoItem>
            <InfoItem>
              <Calendar size={18} />
              <span>大学二年级</span>
            </InfoItem>
            <InfoItem>
              <GraduationCap size={18} />
              <span>情报理工</span>
            </InfoItem>
          </InfoList>
        </InfoCard>

        <ContactCard
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InfoTitle>
            <MessageCircle size={24} />
            联系方式
          </InfoTitle>
          <InfoList>
            <InfoItem>
              <ContactLink href="mailto:rakel@example.com">
                <Mail size={18} />
                <span>邮箱联系</span>
              </ContactLink>
            </InfoItem>
            <InfoItem>
              <ContactLink href="#" onClick={(e) => e.preventDefault()}>
                <MessageCircle size={18} />
                <span>微信咨询</span>
              </ContactLink>
            </InfoItem>
            <InfoItem>
              <ContactLink href="https://github.com/rakei076" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                <span>rakei076</span>
              </ContactLink>
            </InfoItem>
          </InfoList>
        </ContactCard>
      </InfoGrid>

      <BioSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BioTitle>个人简介</BioTitle>
        <BioText>
          你好！我是 Rakel，一名正在日本学计算机的大二学生。是一个不会讲粤语的广州人。
          <br /><br />
          这个网站是我的个人空间，用来记录我的成长经历、分享我的项目作品，以及记录那些值得纪念的时刻。
          虽然这里主要是我的个人档案，但如果你对我的经历或项目感兴趣，欢迎通过上面的联系方式与我交流！
          <br /><br />
          希望通过这个网站，能够更好地展示真实的自己，也为未来的自己留下一份珍贵的记录。
        </BioText>
      </BioSection>
    </PageContainer>
  );
};

