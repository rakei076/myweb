/**
 * 友链书签页面
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { bookmarks } from '../../data/bookmarks';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${props => props.$isActive ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${props => props.$isActive ? theme.colors.textWhite : theme.colors.textSecondary};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const BookmarkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const BookmarkCard = styled(motion.a)`
  display: block;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  text-decoration: none;
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const BookmarkHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const FaviconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  font-size: 24px;
`;

const BookmarkTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  flex: 1;
`;

const BookmarkDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BookmarkTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const Tag = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.backgroundGrey};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textSecondary};
`;

const BookmarkUrl = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  margin-top: ${theme.spacing.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: '全部', icon: '📚' },
    { id: 'tech', label: '技术', icon: '💻' },
    { id: 'tool', label: '工具', icon: '🛠️' },
    { id: 'learning', label: '学习', icon: '📖' },
    { id: 'entertainment', label: '娱乐', icon: '🎮' },
  ];

  const filteredBookmarks = activeCategory === 'all'
    ? bookmarks
    : bookmarks.filter(bookmark => bookmark.category === activeCategory);

  return (
    <PageContainer>
      <PageTitle>友链书签 🔖</PageTitle>

      <CategoryFilter>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            $isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon} {category.label}
          </FilterButton>
        ))}
      </CategoryFilter>

      <BookmarkGrid>
        {filteredBookmarks.map((bookmark, index) => (
          <BookmarkCard
            key={bookmark.id}
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <BookmarkHeader>
              <FaviconContainer>
                {bookmark.favicon || '🔗'}
              </FaviconContainer>
              <BookmarkTitle>{bookmark.title}</BookmarkTitle>
            </BookmarkHeader>
            
            {bookmark.description && (
              <BookmarkDescription>{bookmark.description}</BookmarkDescription>
            )}

            {bookmark.tags && bookmark.tags.length > 0 && (
              <BookmarkTags>
                {bookmark.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </BookmarkTags>
            )}

            <BookmarkUrl>{bookmark.url}</BookmarkUrl>
          </BookmarkCard>
        ))}
      </BookmarkGrid>
    </PageContainer>
  );
};

export default BookmarksPage;