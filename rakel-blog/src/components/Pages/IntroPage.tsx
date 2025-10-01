import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, MapPin, GraduationCap, Calendar, User } from 'lucide-react';
import wechatQr from '../../assets/contact/wechat-qr.png';
import avatarImg from '../../assets/profile/avatar.jpg';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const AvatarFrame = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.round};
  margin: 0 auto ${theme.spacing.lg};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${theme.borderRadius.round};
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

  &.wechat-item {
    align-items: flex-start;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
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

const ContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  background: transparent;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: ${theme.colors.text.primary};
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
`;

const WechatQRWrapper = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.85);
  box-shadow: ${theme.shadows.md};
  display: grid;
  gap: ${theme.spacing.sm};
  justify-items: center;
  max-width: 220px;
`;

const WechatQRImage = styled.img`
  width: 180px;
  height: auto;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const WechatQRNote = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary};
  font-size: 0.8rem;
  line-height: 1.4;
  text-align: center;
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

const FooterNote = styled.p`
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 0.85rem;
  margin-top: ${theme.spacing.xl};
`;

export const IntroPage: React.FC = () => {
  const [wechatQrVisible, setWechatQrVisible] = useState(false);

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AvatarFrame
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AvatarImage src={avatarImg} alt="Rakel 的头像" loading="lazy" />
        </AvatarFrame>
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
              <User size={18} />
              <span>性别：男</span>
            </InfoItem>
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
              <ContactLink href="mailto:lurenjialu2@gmail.com">
                <Mail size={18} />
                <span>lurenjialu2@gmail.com</span>
              </ContactLink>
            </InfoItem>
            <InfoItem className="wechat-item">
              <ContactButton type="button" onClick={() => setWechatQrVisible((prev) => !prev)}>
                <MessageCircle size={18} />
                <span>微信咨询</span>
              </ContactButton>
              {wechatQrVisible && (
                <WechatQRWrapper>
                  <WechatQRImage src={wechatQr} alt="微信二维码" loading="lazy" />
                  <WechatQRNote>扫码加微信：帝皇の学徒</WechatQRNote>
                  <WechatQRNote style={{ fontSize: '0.75rem' }}>如无法扫码，也可邮件私信获取微信号。</WechatQRNote>
                </WechatQRWrapper>
              )}
            </InfoItem>
            <InfoItem>
              <ContactLink href="https://github.com/rakei076" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                <span>Github · rakei076</span>
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

      <FooterNote>该网页为 GPT-5-codex100% 协作完成</FooterNote>
    </PageContainer>
  );
};

