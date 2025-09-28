import { useEffect, useMemo, useState, type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { interestsData } from '../../data/interests';
import type { Interest } from '../../types';
import * as Icons from 'lucide-react';
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

const CarouselContainer = styled.div`
  position: relative;
  height: 520px;
  margin-bottom: ${theme.spacing.xl};

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
  border-radius: ${theme.borderRadius.lg};
  background: ${({ $background, $image }) => $image ? `url(${$image}) center / cover no-repeat` : $background};
  color: #f9fbff;
  box-shadow: 0 24px 40px rgba(15, 26, 67, 0.25);
  overflow: hidden;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      ${({ $background }) => $background},
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3), transparent 55%),
      radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.25), transparent 60%),
      linear-gradient(135deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55));
    opacity: 0.7;
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const PosterTopRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PosterBadge = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  backdrop-filter: blur(6px);
`;

const PosterIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.round};
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(12, 19, 51, 0.35);

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

const PosterContent = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const PosterTitle = styled.h2`
  font-size: 3rem;
  margin: 0;
  letter-spacing: 0.04em;
  text-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.4rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PosterTagline = styled.p`
  font-size: 1.4rem;
  max-width: 620px;
  line-height: 1.6;
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.05rem;
  }
`;

const PosterHighlight = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const PosterDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const PosterFooter = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  background: rgba(10, 16, 40, 0.25);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  backdrop-filter: blur(6px);
  align-self: flex-start;
`;

const FooterLabel = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
`;

const AchievementRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const AchievementChip = styled.span`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.03em;
`;

const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => (props.$position === 'left' ? 'left: -28px;' : 'right: -28px;')}
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.round};
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(10, 16, 40, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  box-shadow: 0 18px 28px rgba(15, 26, 67, 0.3);
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    background: rgba(10, 16, 40, 0.55);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 46px;
    height: 46px;
    ${props => (props.$position === 'left' ? 'left: -10px;' : 'right: -10px;')}
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

  const getIcon = (iconName: string, size = 28) => {
    const IconComponent = (Icons as Record<string, any>)[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>兴趣爱好</Title>
        <Subtitle>
          把每一份热爱的瞬间做成海报，用最沉浸的方式记录我的游戏、技术与生活灵感。
        </Subtitle>
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
                  <PosterTopRow>
                    <PosterBadge>{categoryLabels[currentInterest.category]}</PosterBadge>
                    <PosterIcon>{getIcon(currentInterest.icon, 28)}</PosterIcon>
                  </PosterTopRow>

                  <PosterContent>
                    <PosterTitle>{currentInterest.name}</PosterTitle>
                    {currentInterest.heroTagline && <PosterTagline>{currentInterest.heroTagline}</PosterTagline>}
                    {currentInterest.heroHighlight && <PosterHighlight>{currentInterest.heroHighlight}</PosterHighlight>}
                    <PosterDescription>{currentInterest.description}</PosterDescription>
                  </PosterContent>

                  {currentInterest.achievements && currentInterest.achievements.length > 0 && (
                    <PosterFooter>
                      <FooterLabel>闪光瞬间</FooterLabel>
                      <AchievementRow>
                        {currentInterest.achievements.map((achievement, index) => (
                          <AchievementChip key={`${currentInterest.id}-achievement-${index}`}>
                            {achievement}
                          </AchievementChip>
                        ))}
                      </AchievementRow>
                    </PosterFooter>
                  )}
                </PosterCard>
              )}
            </AnimatePresence>
          </CarouselContainer>

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

