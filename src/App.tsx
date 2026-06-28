import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import MangaDetails from './pages/MangaDetails';
import Reader from './pages/Reader';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect } from 'react';

function AppContent() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/reader/:mangaId/:chapterId" element={<Reader />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manga/:id" element={<MangaDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/latest" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
