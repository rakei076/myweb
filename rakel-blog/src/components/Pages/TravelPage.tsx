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
  position: relative;
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at 16% 12%, rgba(82, 118, 255, 0.35) 0%, rgba(9, 18, 46, 0.78) 45%, rgba(5, 12, 32, 0.92) 100%),
    linear-gradient(180deg, rgba(5, 10, 24, 0.96) 0%, rgba(5, 11, 28, 0.94) 60%, rgba(4, 9, 23, 0.98) 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlobeCanvasShell = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 !important;
    background: transparent !important;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(208, 220, 255, 0.78);
  font-size: 0.9rem;
  letter-spacing: 0.02em;
`;

const ModalSectionTitle = styled.h3`
  margin: ${theme.spacing.lg} 0 ${theme.spacing.sm};
  font-size: 1.05rem;
  font-weight: 600;
  color: rgba(235, 241, 255, 0.92);
  letter-spacing: 0.06em;
`;

const ModalMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.md};
`;

const PhotoStrip = styled.div`
  display: flex;
  gap: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.xl});
  overflow-x: auto;
  padding-bottom: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};

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
  width: clamp(200px, 24vw, 260px);
  height: clamp(130px, 16vw, 180px);
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  padding: 0;
  cursor: zoom-in;
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &::before {
    background: linear-gradient(185deg, rgba(6, 12, 28, 0.68) 0%, rgba(6, 12, 28, 0.35) 55%, rgba(6, 12, 28, 0.05) 100%);
    mix-blend-mode: multiply;
    opacity: 0.85;
  }

  &::after {
    background: radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 55%),
      linear-gradient(120deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%);
    mix-blend-mode: screen;
    opacity: 0.7;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
    filter: saturate(1.08);
  }

  &:hover img {
    transform: scale(1.07);
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
  background:
    linear-gradient(155deg, rgba(16, 28, 64, 0.96) 0%, rgba(34, 49, 94, 0.92) 54%, rgba(12, 21, 48, 0.95) 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: clamp(${theme.spacing.xl}, 6vw, ${theme.spacing.xxl});
  max-width: 640px;
  width: 100%;
  position: relative;
  max-height: 82vh;
  overflow-y: auto;
  border: 1px solid rgba(138, 176, 255, 0.2);
  box-shadow: 0 28px 70px rgba(2, 7, 20, 0.55);
  backdrop-filter: blur(26px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 42px;
  height: 42px;
  border-radius: ${theme.borderRadius.round};
  border: 1px solid rgba(158, 198, 255, 0.35);
  background:
    linear-gradient(135deg, rgba(34, 54, 104, 0.85) 0%, rgba(20, 32, 68, 0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(231, 238, 255, 0.9);
  transition: all 0.24s ease;
  backdrop-filter: blur(16px);

  &:hover {
    transform: translateY(-1px) scale(1.03);
    border-color: rgba(170, 208, 255, 0.75);
    color: rgba(255, 255, 255, 0.95);
  }
`;

const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.7rem;
  color: rgba(240, 245, 255, 0.95);
  margin-bottom: ${theme.spacing.lg};
  padding-right: 60px;
  letter-spacing: 0.06em;
`;

const ModalTitleCountry = styled.span`
  color: rgba(195, 210, 255, 0.75);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
`;

const ModalDescription = styled.p`
  color: rgba(215, 226, 255, 0.82);
  line-height: 1.9;
  font-size: 1.05rem;
  letter-spacing: 0.03em;
`;

const PhotoModalContent = styled(motion.div)`
  background:
    linear-gradient(160deg, rgba(16, 28, 64, 0.96) 0%, rgba(32, 46, 86, 0.92) 52%, rgba(12, 21, 48, 0.95) 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: clamp(${theme.spacing.lg}, 4vw, ${theme.spacing.xxl});
  max-width: min(960px, 90vw);
  width: 100%;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  border: 1px solid rgba(138, 176, 255, 0.22);
  box-shadow: 0 28px 70px rgba(2, 7, 20, 0.6);
  backdrop-filter: blur(24px);
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
  color: rgba(210, 224, 255, 0.72);
  font-size: 0.98rem;
  line-height: 1.65;
  letter-spacing: 0.03em;
`;

export const TravelPage: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [photoModal, setPhotoModal] = useState<{ src: string; alt: string } | null>(null);

  const handleLocationClick = (location: TravelLocation) => {
    setSelectedLocation((prev) => (prev?.id === location.id ? null : location));
  };

  const closeModal = () => {
    setSelectedLocation(null);
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
      <Suspense fallback={<LoadingSpinner>加载3D地图中...</LoadingSpinner>}>
        <GlobeCanvasShell>
          <Globe
            onLocationClick={handleLocationClick}
            selectedLocation={selectedLocation}
          />
        </GlobeCanvasShell>
      </Suspense>

      <AnimatePresence>
        {selectedLocation && (
          <Modal
            key={selectedLocation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <X size={20} />
              </CloseButton>

              <ModalTitle>
                <MapPin size={20} />
                {selectedLocation.name}
                <ModalTitleCountry>· {selectedLocation.country}</ModalTitleCountry>
              </ModalTitle>

              <ModalDescription>
                {selectedLocation.description}
              </ModalDescription>

              <ModalMeta>
                <MetaItem>
                  <Calendar size={16} />
                  访问时间: {new Date(selectedLocation.visitDate).toLocaleDateString('zh-CN')}
                </MetaItem>
              </ModalMeta>

              {selectedLocation.photos.length > 0 && (
                <div>
                  <ModalSectionTitle>旅途照片</ModalSectionTitle>
                  <PhotoStrip>
                    {selectedLocation.photos.map((photo, i) => {
                      const resolved = resolveTravelPhoto(photo);
                      if (!resolved) {
                        return null;
                      }
                      const alt = `${selectedLocation.name} 倩影 ${i + 1}`;
                      return (
                        <PhotoThumbnail
                          key={`${selectedLocation.id}-${photo}-${i}`}
                          type="button"
                          onClick={() => openPhotoModal(resolved, alt)}
                          aria-label={`查看${alt}大图`}
                        >
                          <img src={resolved} alt={alt} loading="lazy" />
                        </PhotoThumbnail>
                      );
                    })}
                  </PhotoStrip>
                </div>
              )}
            </ModalContent>
          </Modal>
        )}

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




