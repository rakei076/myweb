import { useEffect, useMemo, useState, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { interestsData } from '../../data/interests';
import type { Interest } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1000px;
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

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => (props.$isActive ? theme.colors.accent : theme.colors.secondary)};
  color: ${props => (props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary)};
  font-weight: ${props => (props.$isActive ? '600' : '400')};
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }
`;

const FullBleed = styled.div`
  margin-left: calc(-1 * ${theme.spacing.xxl});
  margin-right: calc(-1 * ${theme.spacing.xxl});

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
  height: 520px;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 460px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 420px;
  }
`;

const PosterCard = styled(motion.div)<{ $background: string; $image?: string }>`
  position: absolute;
  inset: 0;
  border-radius: 0;
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
      linear-gradient(140deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.55));
    opacity: 0.6;
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
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${theme.spacing.xxl};
  text-align: left;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const PosterTitle = styled.h2`
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  margin: 0;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.4rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  z-index: 2;
  ${props => (props.$position === 'left' ? 'left: -64px;' : 'right: -64px;')}
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
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
    ${props => (props.$position === 'left' ? 'left: -24px;' : 'right: -24px;')}
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

const categoryLabels = {
  all: '全部',
  game: '游戏',
  tech: '技术',
  life: '生活'
};

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

const interestBackgroundModules = import.meta.glob('../../assets/interests/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const resolveBackgroundImage = (fileName?: string) => {
  if (!fileName) return undefined;
  const key = `../../assets/interests/${fileName}`;
  return interestBackgroundModules[key];
};

export const InterestsPage: FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | Interest['category']>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const filteredInterests = useMemo(
    () => (activeFilter === 'all' ? interestsData : interestsData.filter(interest => interest.category === activeFilter)),
    [activeFilter]
  );

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [activeFilter]);

  useEffect(() => {
    if (currentIndex >= filteredInterests.length) {
      setCurrentIndex(0);
      setDirection(0);
    }
  }, [filteredInterests.length, currentIndex]);

  const paginate = (newDirection: number) => {
    if (filteredInterests.length === 0) return;

    setDirection(newDirection);
    setCurrentIndex(prev => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) {
        return filteredInterests.length - 1;
      }
      if (nextIndex >= filteredInterests.length) {
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

  const currentInterest = filteredInterests[currentIndex];
  const currentBackgroundImage = resolveBackgroundImage(currentInterest?.heroBackgroundImage);

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>{currentInterest?.name ?? '兴趣'}</Title>
        <Subtitle>左右滑动或点击指示点切换不同兴趣。</Subtitle>
      </Header>

      <FilterTabs>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <FilterTab
            key={key}
            $isActive={activeFilter === key}
            onClick={() => setActiveFilter(key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </FilterTab>
        ))}
      </FilterTabs>

      {filteredInterests.length === 0 ? (
        <EmptyState>这个分类暂时还没有内容，换一个标签看看吧。</EmptyState>
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
                  </PosterContent>
                </PosterCard>
              )}
            </AnimatePresence>
            </CarouselContainer>
          </FullBleed>

          <Indicators>
            {filteredInterests.map((interest, index) => (
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

