/**
 * 主应用组件
 */

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';
import BinderLayout from './components/Layout/BinderLayout';

// 页面组件
import IntroPage from './components/Pages/IntroPage';
import InterestsPage from './components/Pages/InterestsPage';
import ProjectsPage from './components/Pages/ProjectsPage';
import TravelPage from './components/Pages/TravelPage';
import SkillsPage from './components/Pages/SkillsPage';
import TimelinePage from './components/Pages/TimelinePage';
import BookmarksPage from './components/Pages/BookmarksPage';

// 应用容器
const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

// 页面组件映射
const pages = [
  IntroPage,        // 0 - 自我介绍
  InterestsPage,    // 1 - 兴趣爱好
  ProjectsPage,     // 2 - 作品展示
  TravelPage,       // 3 - 旅游经历
  SkillsPage,       // 4 - 技术栈（占位，文章分享功能开发中）
  SkillsPage,       // 5 - 技术栈
  TimelinePage,     // 6 - 成长轨迹
  BookmarksPage,    // 7 - 友链书签
  BookmarksPage,    // 8 - 留言板（占位，功能开发中）
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  
  // 获取当前页面组件
  const CurrentPageComponent = pages[currentPage] || IntroPage;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <AppContainer>
          <BinderLayout 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          >
            <CurrentPageComponent />
          </BinderLayout>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;