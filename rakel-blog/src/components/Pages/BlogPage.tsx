import { useMemo, useState, type FC } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { blogPosts } from '../../data/blog';
import type { BlogPost } from '../../types';
import { getPatternConfig } from '../../styles/blogPatterns';

const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const HeroSection = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
`;

const HeroCard = styled(motion.article)<{ $gradient: string; $pattern: BlogPost['heroPattern'] }>`
  position: relative;
  background: ${props => props.$gradient};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  background-image: ${props => getPatternConfig(props.$pattern).background};
  background-size: ${props => getPatternConfig(props.$pattern).size};
  opacity: ${props => getPatternConfig(props.$pattern).opacity};
    mix-blend-mode: screen;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  z-index: 1;
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.58);
  color: ${theme.colors.text.primary};
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
`;

const HeroTitle = styled.h1`
  font-size: 2.4rem;
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.xl} 0 ${theme.spacing.md};
  line-height: 1.25;
`;

const HeroSummary = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  max-width: 520px;
`;

const HeroKeyPoints = styled.ul`
  margin: ${theme.spacing.xl} 0;
  padding: 0;
  display: grid;
  gap: ${theme.spacing.sm};
  list-style: none;

  li {
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    background: rgba(255, 255, 255, 0.55);
    color: ${theme.colors.text.primary};
    font-size: 0.9rem;
    font-weight: 600;
    backdrop-filter: blur(6px);
    max-width: 480px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.95rem;
`;

const HeroDecoration = styled.div`
  position: absolute;
  inset: 22px;
  border-radius: ${theme.borderRadius.lg};
  pointer-events: none;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.35), transparent 55%);
  z-index: 0;
`;

const HeroCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: rgba(255, 255, 255, 0.8);
  color: ${theme.colors.text.primary};
  font-weight: 600;
  text-decoration: none;
  box-shadow: ${theme.shadows.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const TagPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const PanelTitle = styled.h2`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const TagButton = styled(motion.button)<{ $active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${props => props.$active ? '#b4b5bc' : theme.colors.border};
  background-color: ${props => props.$active ? '#ececee' : theme.colors.primary};
  color: ${props => props.$active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: 0.9rem;
  transition: all 0.25s ease;

  &:hover {
    background-color: #ececee;
    color: ${theme.colors.text.primary};
  }
`;

const PostsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.xxl};
`;

const PostCard = styled(motion.article)<{ $gradient: string; $pattern: BlogPost['heroPattern'] }>`
  position: relative;
  background: ${props => props.$gradient};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl} ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  transition: all 0.3s ease;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  background-image: ${props => getPatternConfig(props.$pattern).background};
  background-size: ${props => getPatternConfig(props.$pattern).size};
  opacity: ${props => getPatternConfig(props.$pattern).opacity - 0.05};
    mix-blend-mode: screen;
    pointer-events: none;
  }

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-6px);
  }
`;

const PostContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  z-index: 1;
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const PostSummary = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  flex: 1;
`;

const PostBadge = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.65);
  color: ${theme.colors.text.primary};
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: ${theme.shadows.sm};
  width: fit-content;
`;

const PostBadgeIcon = styled.span`
  font-size: 1rem;
`;

const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.secondary};
  font-size: 0.8rem;
  border: 1px solid ${theme.colors.border};
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const ReadMoreLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
`;

const blogImages = import.meta.glob('../../assets/blog/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const getCoverImage = (post: BlogPost) => {
  if (!post.coverImage) return undefined;
  const key = `../../assets/blog/${post.coverImage}`;
  return blogImages[key];
};

const CoverImage = styled.div<{ $src?: string }>`
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  min-height: 220px;
  background: ${props => props.$src
    ? `url(${props.$src}) center/cover`
    : 'linear-gradient(160deg, #f1f1f5 0%, #d6d7de 100%)'};
`;

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 0.2) 100%);
`;

const CoverHeadline = styled.h2`
  position: absolute;
  left: ${theme.spacing.xl};
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  color: white;
  font-size: 1.6rem;
  line-height: 1.3;
`;

export const BlogPage: FC = () => {
  const [activeTag, setActiveTag] = useState<'全部' | string>('全部');

  const featuredPost = useMemo(() => blogPosts.find((post) => post.featured), []);
  const otherPosts = useMemo(() => blogPosts.filter((post) => post.id !== featuredPost?.id), [featuredPost]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return ['全部', ...Array.from(tagSet)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeTag === '全部') {
      return otherPosts;
    }
    return otherPosts.filter((post) => post.tags.includes(activeTag));
  }, [otherPosts, activeTag]);

  return (
    <PageContainer>
      <HeroSection>
        {featuredPost && (
          <HeroCard
            id={featuredPost.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            $gradient={featuredPost.accentGradient}
            $pattern={featuredPost.heroPattern}
          >
            <HeroContent>
              <HeroBadge>
                <span style={{ fontSize: '1.1rem' }}>{featuredPost.badgeIcon}</span>
                <Tag size={16} /> 精选文章
              </HeroBadge>
              <HeroTitle>{featuredPost.title}</HeroTitle>
              <HeroSummary>{featuredPost.summary}</HeroSummary>
              {featuredPost.keyPoints && (
                <HeroKeyPoints>
                  {featuredPost.keyPoints.map((point) => (
                    <li key={`${featuredPost.id}-${point}`}>{point}</li>
                  ))}
                </HeroKeyPoints>
              )}
              <MetaRow>
                <MetaItem>
                  <Calendar size={16} />
                  {new Date(featuredPost.publishDate).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </MetaItem>
                <MetaItem>
                  <Clock size={16} />
                  {featuredPost.readingTime}
                </MetaItem>
              </MetaRow>
              <HeroCTA to={`/blog/${featuredPost.id}`}>
                阅读全文
                <ArrowRight size={16} />
              </HeroCTA>
            </HeroContent>
            <HeroDecoration />
          </HeroCard>
        )}

        <TagPanel>
          <PanelTitle>浏览主题</PanelTitle>
          <TagList>
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                $active={activeTag === tag}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </TagButton>
            ))}
          </TagList>
        </TagPanel>
      </HeroSection>

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <PostsSection>
            {filteredPosts.map((post, index) => {
              const cover = getCoverImage(post);
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  $gradient={post.accentGradient}
                  $pattern={post.heroPattern}
                >
                  <PostContent>
                    <PostBadge>
                      <PostBadgeIcon>{post.badgeIcon}</PostBadgeIcon>
                      精选主题
                    </PostBadge>

                    <CoverImage $src={cover}>
                      {!cover && <CoverOverlay />}
                      {!cover && <CoverHeadline>{post.title}</CoverHeadline>}
                    </CoverImage>

                    <PostTitle>{post.title}</PostTitle>
                    <PostSummary>{post.summary}</PostSummary>

                    <MetaRow>
                      <MetaItem>
                        <Calendar size={16} />
                        {new Date(post.publishDate).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </MetaItem>
                      <MetaItem>
                        <Clock size={16} />
                        {post.readingTime}
                      </MetaItem>
                    </MetaRow>

                    <TagGroup>
                      {post.tags.map((tag) => (
                        <TagPill key={`${post.id}-${tag}`}>{tag}</TagPill>
                      ))}
                    </TagGroup>

                    <ReadMoreLink to={`/blog/${post.id}`}>
                      阅读文章
                      <ArrowRight size={16} />
                    </ReadMoreLink>
                  </PostContent>
                </PostCard>
              );
            })}
          </PostsSection>
        ) : (
          <EmptyState>
            该主题尚无文章，敬请期待新的内容更新。
          </EmptyState>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
