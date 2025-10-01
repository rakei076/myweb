import { useState, useEffect, Suspense, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { travelData } from '../../data/travel';
import type { TravelLocation } from '../../types';
import { Globe } from '../3D/Globe';
import { MapPin, Calendar, X } from 'lucide-react';

const travelPhotoImports = import.meta.glob('../../assets/travel/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const resolveTravelPhoto = (path?: string): string | null => {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const fileName = path.split('/').pop() ?? path;
  const candidates = new Set<string>([
    `../../assets/travel/${fileName}`,
    path.startsWith('../../assets/travel/') ? path : ''
  ]);

  for (const key of candidates) {
    if (key && travelPhotoImports[key]) {
      return travelPhotoImports[key];
    }
  }

  return null;
};

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

const TimelineItem = styled(motion.div)<{ $isSelected: boolean; $backgroundImage?: string; $accentColor?: string }>`
  position: relative;
  display: flex;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.35s ease;
  border: 2px solid ${props => props.$isSelected ? props.$accentColor || theme.colors.accent : 'transparent'};
  overflow: hidden;
  color: ${theme.colors.text.primary};
  box-shadow: ${theme.shadows.md};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: ${props => props.$backgroundImage ? 0.6 : 0};
    transition: opacity 0.35s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.82) 45%, rgba(255, 255, 255, 0.55) 100%);
    transition: background 0.35s ease;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateX(6px);
  }

  &:hover::before {
    opacity: ${props => props.$backgroundImage ? 0.7 : 0};
  }

  &:hover::after {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.86) 45%, rgba(255, 255, 255, 0.62) 100%);
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

const PhotoStrip = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.sm};

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(120, 120, 120, 0.4);
    border-radius: 9999px;
  }
`;

const PhotoThumbnail = styled.button`
  position: relative;
  width: 120px;
  height: 80px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  padding: 0;
  cursor: zoom-in;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 3px;
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

const PhotoModalContent = styled(motion.div)`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: min(960px, 90vw);
  width: 100%;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const PhotoModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: calc(90vh - 140px);
  object-fit: contain;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
`;

const PhotoModalCaption = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const TravelPage: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState<{ src: string; alt: string } | null>(null);

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

  const openPhotoModal = (photo: string, alt: string) => {
    setPhotoModal({ src: photo, alt });
  };

  const closePhotoModal = () => {
    setPhotoModal(null);
  };

  useEffect(() => {
    const shouldRunDemo = import.meta.env.MODE === 'development' && import.meta.env.VITE_TRAVEL_DEMO === 'true';
    if (!shouldRunDemo) {
      return;
    }

    const sequence = ['osaka', 'tokyo', 'guangzhou'] as const;
    const timers = sequence.map((id, index) =>
      window.setTimeout(() => {
        const location = travelData.find((item) => item.id === id);
        if (location) {
          handleLocationClick(location);
        }
      }, 1400 * (index + 1))
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

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
        {travelData.map((location, index) => {
          const coverPhoto = resolveTravelPhoto(location.photos[0] ?? '') ?? undefined;
          return (
          <TimelineItem
            key={location.id}
            $isSelected={selectedLocation?.id === location.id}
              $accentColor={location.color}
            $backgroundImage={coverPhoto}
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
                </LocationMeta>
              </LocationHeader>
              
              <LocationDescription>
                {location.description}
              </LocationDescription>

              <PhotoStrip>
                {location.photos.map((photo, i) => {
                  const resolved = resolveTravelPhoto(photo);
                  if (!resolved) {
                    return null;
                  }
                  const alt = `${location.name} 倩影 ${i + 1}`;
                  return (
                    <PhotoThumbnail
                      key={`${location.id}-${photo}-${i}`}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openPhotoModal(resolved, alt);
                      }}
                      aria-label={`查看${alt}大图`}
                    >
                      <img src={resolved} alt={alt} loading="lazy" />
                    </PhotoThumbnail>
                  );
                })}
              </PhotoStrip>
            </LocationContent>
          </TimelineItem>
        );
        })}
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
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {photoModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePhotoModal}
          >
            <PhotoModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <CloseButton onClick={closePhotoModal}>
                <X size={20} />
              </CloseButton>
              <PhotoModalImage src={photoModal.src} alt={photoModal.alt} />
              <PhotoModalCaption>{photoModal.alt}</PhotoModalCaption>
            </PhotoModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

