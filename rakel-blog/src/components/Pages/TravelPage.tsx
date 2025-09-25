import { useState, Suspense, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { travelData } from '../../data/travel';
import type { TravelLocation } from '../../types';
import { Globe } from '../3D/Globe';
import { MapPin, Calendar, Camera, Heart, X } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GlobeContainer = styled.div`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
`;

const GlobeInstructions = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.lg};
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const LocationsTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const TimelineItem = styled(motion.div)<{ $isSelected: boolean }>`
  display: flex;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background-color: ${props => props.$isSelected ? theme.colors.accent : theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$isSelected ? props.color || theme.colors.accent : 'transparent'};

  &:hover {
    background-color: ${theme.colors.accent};
    transform: translateX(4px);
  }
`;

const LocationDot = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.$color};
  border-radius: ${theme.borderRadius.round};
  margin-top: 4px;
  flex-shrink: 0;
  box-shadow: ${theme.shadows.sm};
`;

const LocationContent = styled.div`
  flex: 1;
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const LocationTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LocationMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-left: auto;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const LocationDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const PhotoGrid = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const PhotoPlaceholder = styled.div`
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  max-width: 600px;
  width: 100%;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.round};
  background-color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.primary};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
  padding-right: 60px;
`;

const ModalDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.8;
  font-size: 1.1rem;
`;

export const TravelPage: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationClick = (location: TravelLocation) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleTimelineItemClick = (location: TravelLocation) => {
    setSelectedLocation(location);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLocation(null), 300);
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>旅游经历</Title>
        <Subtitle>
          记录我在日本留学期间和回国探亲时的旅行足迹，
          每一个地方都有独特的回忆和感悟。
        </Subtitle>
      </Header>

      <GlobeContainer>
        <Suspense fallback={<LoadingSpinner>加载3D地图中...</LoadingSpinner>}>
          <Globe 
            onLocationClick={handleLocationClick}
            selectedLocation={selectedLocation}
          />
        </Suspense>
        <GlobeInstructions>
          🌍 拖拽旋转地球，点击标记查看详情 | 滚轮缩放
        </GlobeInstructions>
      </GlobeContainer>

      <LocationsTimeline>
        {travelData.map((location, index) => (
          <TimelineItem
            key={location.id}
            $isSelected={selectedLocation?.id === location.id}
            color={location.color}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleTimelineItemClick(location)}
          >
            <LocationDot $color={location.color} />
            <LocationContent>
              <LocationHeader>
                <LocationTitle>
                  <MapPin size={20} />
                  {location.name}, {location.country}
                </LocationTitle>
                <LocationMeta>
                  <MetaItem>
                    <Calendar size={16} />
                    {new Date(location.visitDate).toLocaleDateString('zh-CN')}
                  </MetaItem>
                  <MetaItem>
                    <Heart size={16} />
                    {location.mood}
                  </MetaItem>
                </LocationMeta>
              </LocationHeader>
              
              <LocationDescription>
                {location.description}
              </LocationDescription>
              
              <PhotoGrid>
                {location.photos.map((photo, i) => (
                  <PhotoPlaceholder key={`${location.id}-${photo}-${i}`} title={photo}>
                    <Camera size={20} />
                  </PhotoPlaceholder>
                ))}
              </PhotoGrid>
            </LocationContent>
          </TimelineItem>
        ))}
      </LocationsTimeline>

      <AnimatePresence>
        {isModalOpen && selectedLocation && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <X size={20} />
              </CloseButton>
              
              <ModalTitle>
                {selectedLocation.name}, {selectedLocation.country}
              </ModalTitle>
              
              <ModalDescription>
                {selectedLocation.description}
              </ModalDescription>
              
              <div style={{ marginTop: theme.spacing.lg }}>
                <MetaItem>
                  <Calendar size={16} />
                  访问时间: {new Date(selectedLocation.visitDate).toLocaleDateString('zh-CN')}
                </MetaItem>
                <br />
                <MetaItem>
                  <Heart size={16} />
                  当时心情: {selectedLocation.mood}
                </MetaItem>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

