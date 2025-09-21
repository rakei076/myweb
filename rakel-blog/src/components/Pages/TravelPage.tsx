import React from 'react';
import styled from 'styled-components';
import { travelLocations } from '../../data/travel';
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

const TravelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const LocationCard = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const LocationImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${theme.colors.primary}33, ${theme.colors.secondary}33);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
`;

const LocationContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const LocationName = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const LocationCountry = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 500;
`;

const LocationDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const LocationDate = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: rgba(0, 102, 204, 0.1);
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
`;

const MapContainer = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
  height: 400px;
  background: linear-gradient(135deg, ${theme.colors.primary}11, ${theme.colors.secondary}11);
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
`;

const TravelPage: React.FC = () => {
  const locationEmojis = ['🌸', '🏼', '🗽', '🏁', '🌴'];
  
  return (
    <Container>
      <Title>我的旅行</Title>
      <MapContainer>🌍</MapContainer>
      <TravelGrid>
        {travelLocations.map((location, index) => (
          <LocationCard key={location.id}>
            <LocationImage>
              {locationEmojis[index % locationEmojis.length]}
            </LocationImage>
            <LocationContent>
              <LocationName>{location.name}</LocationName>
              <LocationCountry>{location.country}</LocationCountry>
              {location.description && (
                <LocationDescription>{location.description}</LocationDescription>
              )}
              {location.date && (
                <LocationDate>📅 {location.date}</LocationDate>
              )}
            </LocationContent>
          </LocationCard>
        ))}
      </TravelGrid>
    </Container>
  );
};

export default TravelPage;