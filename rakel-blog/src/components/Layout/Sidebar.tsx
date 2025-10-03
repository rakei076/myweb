import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';
import avatarImg from '../../assets/profile/avatar.jpg';

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const Logo = styled(motion.button)`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.round};
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  background: rgba(15, 22, 36, 0.35);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.85);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 3px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.round};
  object-fit: cover;
`;

const DecorativeElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-top: auto;
`;

const DecorativeDot = styled(motion.div)<{ delay: number }>`
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.55);
  border-radius: ${theme.borderRadius.round};
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="返回顶部"
      >
        <LogoImage src={avatarImg} alt="Rakel 的头像" />
      </Logo>
      
      <DecorativeElements>
        {[0, 1, 2].map((index) => (
          <DecorativeDot
            key={index}
            delay={index}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        ))}
      </DecorativeElements>
    </SidebarContainer>
  );
};

