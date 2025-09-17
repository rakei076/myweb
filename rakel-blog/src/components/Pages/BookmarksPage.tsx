import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { bookmarksData } from '../../data/bookmarks';
import { Bookmark } from '../../types';
import * as Icons from 'lucide-react';
import { ExternalLink, Search, X } from 'lucide-react';

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
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  padding-left: 45px;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    background-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.muted};
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.muted};
  padding: 4px;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.border};
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)<{ $isActive: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => props.$isActive ? theme.colors.accent : theme.colors.secondary};
  color: ${props => props.$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }
`;

const BookmarksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const BookmarkCard = styled(motion.a)`
  display: block;
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-decoration: none;
  color: inherit;
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-4px);
    background-color: ${theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CardTitleContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardUrl = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.text.muted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExternalLinkIcon = styled.div`
  color: ${theme.colors.text.muted};
  transition: all 0.3s ease;

  ${BookmarkCard}:hover & {
    color: ${theme.colors.text.primary};
    transform: translate(2px, -2px);
  }
`;

const CardDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
`;

const CategoryBadge = styled.div<{ $category: Bookmark['category'] }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.$category) {
      case 'tech': return '#E3F2FD';
      case 'tools': return '#E8F5E8';
      case 'learning': return '#FFF3E0';
      case 'entertainment': return '#FCE4EC';
      default: return theme.colors.accent;
    }
  }};
  color: ${props => {
    switch (props.$category) {
      case 'tech': return '#1565C0';
      case 'tools': return '#2E7D32';
      case 'learning': return '#EF6C00';
      case 'entertainment': return '#C2185B';
      default: return theme.colors.text.primary;
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const categoryLabels = {
  all: '全部',
  tech: '技术',
  tools: '工具',
  learning: '学习',
  entertainment: '娱乐'
};

export const BookmarksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | Bookmark['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = bookmarksData.filter(bookmark => {
    const matchesCategory = activeCategory === 'all' || bookmark.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>友链书签</Title>
        <Subtitle>
          收集了我在学习和工作中经常使用的网站和工具，
          按不同类别整理，方便查找和使用。
        </Subtitle>
      </Header>

      <ControlsSection>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="搜索书签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ClearButton onClick={clearSearch}>
              <X size={16} />
            </ClearButton>
          )}
        </SearchContainer>

        <FilterTabs>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <FilterTab
              key={key}
              $isActive={activeCategory === key}
              onClick={() => setActiveCategory(key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </FilterTab>
          ))}
        </FilterTabs>
      </ControlsSection>

      <AnimatePresence mode="wait">
        {filteredBookmarks.length > 0 ? (
          <BookmarksGrid>
            {filteredBookmarks.map((bookmark, index) => (
              <BookmarkCard
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <CategoryBadge $category={bookmark.category}>
                  {categoryLabels[bookmark.category]}
                </CategoryBadge>
                
                <CardHeader>
                  <IconWrapper>
                    {getIcon(bookmark.icon)}
                  </IconWrapper>
                  <CardTitleContainer>
                    <CardTitle>{bookmark.title}</CardTitle>
                    <CardUrl>{bookmark.url}</CardUrl>
                  </CardTitleContainer>
                  <ExternalLinkIcon>
                    <ExternalLink size={18} />
                  </ExternalLinkIcon>
                </CardHeader>
                
                <CardDescription>{bookmark.description}</CardDescription>
              </BookmarkCard>
            ))}
          </BookmarksGrid>
        ) : (
          <EmptyState>
            {searchQuery ? '未找到匹配的书签' : '该分类下暂无书签'}
          </EmptyState>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};