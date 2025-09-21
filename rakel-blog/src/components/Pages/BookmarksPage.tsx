import React, { useState } from 'react';
import styled from 'styled-components';
import { bookmarks } from '../../data/bookmarks';
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['2xl']};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    color: white;
  ` : `
    background-color: ${theme.colors.surface};
    color: ${theme.colors.text};
    
    &:hover {
      background-color: ${theme.colors.border};
    }
  `}
`;

const BookmarkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const BookmarkCard = styled.a`
  display: block;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BookmarkTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const BookmarkUrl = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textLight};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

const BookmarkTags = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  flex-wrap: wrap;
`;

const BookmarkTag = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: rgba(0, 102, 204, 0.1);
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.xs};
`;

const BookmarksPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('全部');
  
  const categories = ['全部', ...new Set(bookmarks.map(bookmark => bookmark.category))];
  
  const filteredBookmarks = activeFilter === '全部' 
    ? bookmarks 
    : bookmarks.filter(bookmark => bookmark.category === activeFilter);
  
  return (
    <Container>
      <Title>我的书签</Title>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>
      <BookmarkGrid>
        {filteredBookmarks.map(bookmark => (
          <BookmarkCard key={bookmark.id} href={bookmark.url} target="_blank">
            <BookmarkTitle>{bookmark.title}</BookmarkTitle>
            <BookmarkUrl>{bookmark.url}</BookmarkUrl>
            {bookmark.description && (
              <BookmarkDescription>{bookmark.description}</BookmarkDescription>
            )}
            {bookmark.tags && (
              <BookmarkTags>
                {bookmark.tags.map(tag => (
                  <BookmarkTag key={tag}>{tag}</BookmarkTag>
                ))}
              </BookmarkTags>
            )}
          </BookmarkCard>
        ))}
      </BookmarkGrid>
    </Container>
  );
};

export default BookmarksPage;