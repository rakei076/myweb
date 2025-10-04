import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { theme } from '../../styles/theme';
import { getPatternConfig } from '../../styles/blogPatterns';

const PageWrapper = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding-bottom: calc(${theme.spacing.xxl} + ${theme.spacing.lg});
`;

const BackButton = styled.button<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  border: none;
  background-color: ${props => `${props.$accent}15`};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateX(-4px);
    box-shadow: ${theme.shadows.sm};
  }
`;

const HeroSection = styled(motion.section)<{ $gradient: string; $pattern: string; $patternSize: string; $patternOpacity: number }>`
  position: relative;
  background: ${props => props.$gradient};
  border-radius: ${theme.borderRadius.lg};
  padding: calc(${theme.spacing.xxl} + ${theme.spacing.lg}) ${theme.spacing.xxl} ${theme.spacing.xxl};
  color: ${theme.colors.text.primary};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${props => props.$pattern};
    background-size: ${props => props.$patternSize};
    opacity: ${props => props.$patternOpacity};
    mix-blend-mode: screen;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.7);
  color: ${theme.colors.text.primary};
  font-weight: 600;
  backdrop-filter: blur(6px);
  width: fit-content;
`;

const HeroTitle = styled.h1`
  font-size: 2.6rem;
  line-height: 1.2;
  margin: 0;
  color: ${theme.colors.text.primary};
`;

const HeroSummary = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  margin: 0;
  color: ${theme.colors.text.secondary};
  max-width: 600px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  color: ${theme.colors.text.secondary};
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.95rem;
`;

const TagList = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.md};
`;

const TagChip = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  background-color: rgba(255, 255, 255, 0.7);
  color: ${theme.colors.text.primary};
  font-weight: 600;
  border: 1px solid ${props => `${props.$accent}55`};
`;

const ArticleBody = styled.section`
  margin-top: calc(${theme.spacing.xxl} + ${theme.spacing.lg});
  display: grid;
  gap: ${theme.spacing.xxl};
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: ${theme.colors.text.primary};
`;

const KeyPointSection = styled.section`
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
  display: grid;
  gap: ${theme.spacing.lg};
`;

const KeyPointHeading = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
`;

const KeyPointList = styled.ul<{ $accent: string }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${theme.spacing.md};

  li {
    display: flex;
    gap: ${theme.spacing.md};
    align-items: flex-start;
    padding: ${theme.spacing.md};
    border-left: 4px solid ${props => props.$accent};
    border-radius: ${theme.borderRadius.md};
    background-color: rgba(255, 255, 255, 0.85);
    color: ${theme.colors.text.primary};
    font-size: 0.98rem;
    line-height: 1.6;
    box-shadow: ${theme.shadows.sm};
  }
`;

const AccentDot = styled.span<{ $accent: string }>`
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background-color: ${props => props.$accent};
  flex-shrink: 0;
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
`;

export const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => blogPosts.find((item) => item.id === postId), [postId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postId]);

  const handleBack = () => {
    if (window.history.length <= 2) {
      navigate('/blog');
    } else {
      navigate(-1);
    }
  };

  if (!post) {
    return (
      <PageWrapper>
        <NotFound>文章没有找到，可能已经被移动或删除。</NotFound>
      </PageWrapper>
    );
  }

  const patternConfig = getPatternConfig(post.heroPattern);
  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <PageWrapper>
  <BackButton $accent={post.accentColor} onClick={handleBack}>
        <ArrowLeft size={16} /> 返回文章列表
      </BackButton>

      <HeroSection
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        $gradient={post.accentGradient}
        $pattern={patternConfig.background}
        $patternSize={patternConfig.size}
        $patternOpacity={patternConfig.opacity}
      >
        <HeroContent>
          <HeroBadge>
            <span style={{ fontSize: '1.2rem' }}>{post.badgeIcon}</span>
            精选主题
          </HeroBadge>
          <HeroTitle>{post.title}</HeroTitle>
          <HeroSummary>{post.summary}</HeroSummary>
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
          <TagList>
            {post.tags.map((tag) => (
              <TagChip key={`${post.id}-${tag}`} $accent={post.accentColor}>
                <Tag size={14} />
                {tag}
              </TagChip>
            ))}
          </TagList>
        </HeroContent>
      </HeroSection>

      {post.keyPoints && (
        <KeyPointSection>
          <KeyPointHeading>阅读重点</KeyPointHeading>
          <KeyPointList $accent={post.accentColor}>
            {post.keyPoints.map((point) => (
              <li key={`${post.id}-key-${point}`}>
                <AccentDot $accent={post.accentColor} />
                {point}
              </li>
            ))}
          </KeyPointList>
        </KeyPointSection>
      )}

      <ArticleBody>
        {paragraphs.map((paragraph, index) => (
          <Paragraph key={`${post.id}-paragraph-${index}`}>{paragraph}</Paragraph>
        ))}
      </ArticleBody>
    </PageWrapper>
  );
};
