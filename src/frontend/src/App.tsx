import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import ReportForm from './pages/ReportForm';
import ReportList from './pages/ReportList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { getStoredUser } from './services/api';

function requireAuth() {
  return getStoredUser() ? null : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={requireAuth() ?? <LoginPage />} />
          <Route path="/register" element={requireAuth() ?? <RegisterPage />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/dashboard" element={<Navigate to="/reports" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
