import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  h1 {
    font-size: ${theme.fontSizes['4xl']};
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h2 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.textLight};
    margin-bottom: ${theme.spacing.xl};
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    line-height: 1.8;
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const Button = styled.a<{ primary?: boolean }>`
  display: inline-block;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  ` : `
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    
    &:hover {
      background-color: ${theme.colors.primary};
      color: white;
    }
  `}
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  position: relative;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  &::before {
    content: '🚀';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 120px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 300px;
    height: 300px;
  }
`;

const IntroPage: React.FC = () => {
  return (
    <Container>
      <IntroSection>
        <TextContent>
          <h1>你好，我是开发者</h1>
          <h2>全栈工程师 | 创意编程者</h2>
          <p>
            我热爱构建令人惊叹的Web应用，
            专注于创造优雅、高效的用户体验。
            从前端到后端，我享受将创意变为现实的过程。
          </p>
          <ButtonGroup>
            <Button primary href="#projects">查看作品</Button>
            <Button href="#contact">联系我</Button>
          </ButtonGroup>
        </TextContent>
        <ImageContainer>
          <ProfileImage />
        </ImageContainer>
      </IntroSection>
    </Container>
  );
};

export default IntroPage;