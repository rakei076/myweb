import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const Logo = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const LogoText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 20px;
  font-family: ${theme.fonts.english};
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
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: ${theme.borderRadius.round};
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoText>R</LogoText>
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