// React组件导入
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import { CartProvider } from './contexts/CartContext';

// 页面组件
import HomePage from './pages/Home';
import GameDetailPage from './pages/GameDetail';
import DeploymentPage from './pages/Deployment';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import GamesPage from './pages/Games';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import CareersPage from './pages/Careers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/games" element={<Layout><GamesPage /></Layout>} />
            <Route path="/games/:id" element={<Layout><GameDetailPage /></Layout>} />
            <Route path="/deployment/:id" element={<Layout><DeploymentPage /></Layout>} />
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
            <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
            <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
