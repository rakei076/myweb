import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './components/Layout/Navigation';
import IntroPage from './components/Pages/IntroPage';
import SkillsPage from './components/Pages/SkillsPage';
import ProjectsPage from './components/Pages/ProjectsPage';
import TimelinePage from './components/Pages/TimelinePage';
import TravelPage from './components/Pages/TravelPage';
import InterestsPage from './components/Pages/InterestsPage';
import BookmarksPage from './components/Pages/BookmarksPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const PageContainer = styled.div`
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const renderPage = () => {
    switch(currentPath) {
      case '/':
        return <IntroPage />;
      case '/skills':
        return <SkillsPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/timeline':
        return <TimelinePage />;
      case '/travel':
        return <TravelPage />;
      case '/interests':
        return <InterestsPage />;
      case '/bookmarks':
        return <BookmarksPage />;
      default:
        return <IntroPage />;
    }
  };

  return (
    <AppContainer>
      <Navigation currentPath={currentPath} onNavigate={setCurrentPath} />
      <PageContainer key={currentPath}>
        {renderPage()}
      </PageContainer>
    </AppContainer>
  );
}

export default App
