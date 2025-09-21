import React from 'react';
import styled from 'styled-components';
import { interests } from '../../data/interests';
import { theme } from '../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  min-height: calc(100vh - 60px);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  font-size: ${theme.fontSizes['3xl']};
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const InterestCard = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  display: flex;
  align-items: start;
  gap: ${theme.spacing.lg};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const InterestIcon = styled.div`
  font-size: 48px;
  line-height: 1;
`;

const InterestContent = styled.div`
  flex: 1;
`;

const InterestTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const InterestDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  line-height: 1.6;
`;

const InterestsPage: React.FC = () => {
  return (
    <Container>
      <Title>我的兴趣</Title>
      <InterestsGrid>
        {interests.map(interest => (
          <InterestCard key={interest.id}>
            <InterestIcon>{interest.icon}</InterestIcon>
            <InterestContent>
              <InterestTitle>{interest.title}</InterestTitle>
              <InterestDescription>{interest.description}</InterestDescription>
            </InterestContent>
          </InterestCard>
        ))}
      </InterestsGrid>
    </Container>
  );
};

export default InterestsPage;