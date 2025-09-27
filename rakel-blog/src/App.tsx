import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import { BinderLayout } from './components/Layout/BinderLayout';
import { IntroPage } from './components/Pages/IntroPage';
import { InterestsPage } from './components/Pages/InterestsPage';
import { ProjectsPage } from './components/Pages/ProjectsPage';
import { TravelPage } from './components/Pages/TravelPage';
import { TimelinePage } from './components/Pages/TimelinePage';

// Placeholder components for other pages
const BlogPage = () => <div>文章分享页面 - 开发中</div>;
const GuestbookPage = () => <div>留言板页面 - 开发中</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <BinderLayout>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
          </Routes>
        </BinderLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

