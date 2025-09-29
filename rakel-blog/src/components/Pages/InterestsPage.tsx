import { useEffect, useState, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { interestsData } from '../../data/interests';
import type { Interest } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
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


const FullBleed = styled.div`
  margin-left: calc(-1 * ${theme.spacing.xl});
  margin-right: calc(-1 * ${theme.spacing.xl});

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: calc(-1 * ${theme.spacing.lg});
    margin-right: calc(-1 * ${theme.spacing.lg});
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: calc(-1 * ${theme.spacing.md});
    margin-right: calc(-1 * ${theme.spacing.md});
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: clamp(520px, 60vh, 640px);
  margin-bottom: ${theme.spacing.xl};
  padding: 0 ${theme.spacing.xl};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: clamp(460px, 58vh, 560px);
    padding: 0 ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: clamp(380px, 55vh, 480px);
    padding: 0 ${theme.spacing.md};
  }
`;

const PosterCard = styled(motion.div)<{ $background: string; $image?: string }>`
  position: absolute;
  inset: 0;
  border-radius: ${theme.borderRadius.lg};
  background: ${({ $background, $image }) => $image ? `url(${$image}) center / cover no-repeat` : $background};
  color: #f9fbff;
  box-shadow: none;
  overflow: hidden;
  padding: 0;
  display: flex;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      ${({ $background }) => $background},
      linear-gradient(140deg, rgba(8, 12, 20, 0.15), rgba(8, 12, 20, 0.55));
    opacity: 0.45;
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 0;
  }
`;

const PosterContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xxl};
  text-align: left;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    gap: ${theme.spacing.md};
  }
`;

const PosterTitle = styled.h2`
  font-size: clamp(2.6rem, 5vw, 4rem);
  margin: 0;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.6rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.1rem;
  }
`;

const PosterTagline = styled.p`
  margin: 0;
  font-size: clamp(1.05rem, 2.3vw, 1.4rem);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const PosterDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(235, 239, 245, 0.85);
`;

const PosterHighlight = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
`;


const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  z-index: 2;
  ${props => (props.$position === 'left' ? `left: ${theme.spacing.lg};` : `right: ${theme.spacing.lg};`)}
  transform: translateY(-50%);
  width: 54px;
  height: 54px;
  border-radius: ${theme.borderRadius.round};
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(15, 20, 30, 0.32);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  box-shadow: 0 18px 28px rgba(15, 26, 67, 0.3);
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    background: rgba(20, 24, 32, 0.55);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 46px;
    height: 46px;
    ${props => (props.$position === 'left' ? `left: ${theme.spacing.md};` : `right: ${theme.spacing.md};`)}
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const IndicatorDot = styled.button<{ $active: boolean }>`
  width: ${props => (props.$active ? '36px' : '12px')};
  height: 12px;
  border-radius: 999px;
  background: ${props => (props.$active ? '#1f7bff' : 'rgba(13, 31, 64, 0.2)')};
  border: none;
  transition: all 0.25s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: #1f7bff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
`;

const categoryGradients: Record<Interest['category'], string> = {
  game: 'linear-gradient(135deg, #142044 0%, #383a8b 100%)',
  tech: 'linear-gradient(135deg, #0a1d2f 0%, #144a7a 100%)',
  life: 'linear-gradient(135deg, #12352f 0%, #3c8d71 100%)'
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96
  })
};

const swipeThreshold = 120;
const swipeVelocity = 600;

const interestBackgroundModules = {
  ...import.meta.glob('../../assets/interests/*', {
    eager: true,
    import: 'default'
  }),
  ...import.meta.glob('../../assets/travel/*', {
    eager: true,
    import: 'default'
  })
} as Record<string, string>;

const resolveBackgroundImage = (fileName?: string) => {
  if (!fileName) return undefined;
  const possibleKeys = [
    `../../assets/interests/${fileName}`,
    `../../assets/travel/${fileName}`
  ];

  for (const key of possibleKeys) {
    if (interestBackgroundModules[key]) {
      return interestBackgroundModules[key];
    }
  }

  return undefined;
};

export const InterestsPage: FC = () => {
  const interestsList: Interest[] = interestsData;
  const totalCount = interestsList.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (totalCount === 0) {
      setCurrentIndex(0);
      setDirection(0);
      return;
    }

    if (currentIndex >= totalCount) {
      setCurrentIndex(0);
      setDirection(0);
    }
  }, [totalCount, currentIndex]);

  const paginate = (newDirection: number) => {
    if (totalCount === 0) return;

    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        return totalCount - 1;
      }
      if (nextIndex >= totalCount) {
        return 0;
      }
      return nextIndex;
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      paginate(-1);
      return;
    }

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      paginate(1);
    }
  };

  const currentInterest = totalCount > 0 ? interestsList[currentIndex] : null;
  const currentBackgroundImage = resolveBackgroundImage(currentInterest?.heroBackgroundImage);

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>{currentInterest?.name ?? '兴趣'}</Title>
      </Header>

      {totalCount === 0 ? (
        <EmptyState>这里暂时还没有内容，稍后再来看看吧。</EmptyState>
      ) : (
        <>
          <FullBleed>
            <CarouselContainer>
              <NavigationButton $position="left" type="button" onClick={() => paginate(-1)} aria-label="切换上一项">
                <ChevronLeft size={24} />
              </NavigationButton>
              <NavigationButton $position="right" type="button" onClick={() => paginate(1)} aria-label="切换下一项">
                <ChevronRight size={24} />
              </NavigationButton>

              <AnimatePresence custom={direction} initial={false} mode="wait">
                {currentInterest && (
                  <PosterCard
                    key={currentInterest.id}
                    $background={currentInterest.heroBackground ?? categoryGradients[currentInterest.category]}
                    $image={currentBackgroundImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                  >
                    <PosterContent>
                      <PosterTitle>{currentInterest.name}</PosterTitle>
                      {currentInterest.heroTagline && (
                        <PosterTagline>{currentInterest.heroTagline}</PosterTagline>
                      )}
                      {currentInterest.heroHighlight && (
                        <PosterHighlight>{currentInterest.heroHighlight}</PosterHighlight>
                      )}
                      <PosterDescription>{currentInterest.description}</PosterDescription>
                    </PosterContent>
                  </PosterCard>
                )}
              </AnimatePresence>
            </CarouselContainer>
          </FullBleed>

          <Indicators>
            {interestsList.map((interest: Interest, index) => (
              <IndicatorDot
                key={interest.id}
                $active={index === currentIndex}
                onClick={() => {
                  if (index === currentIndex) return;
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`查看 ${interest.name}`}
              />
            ))}
          </Indicators>
        </>
      )}
    </PageContainer>
  );
};

