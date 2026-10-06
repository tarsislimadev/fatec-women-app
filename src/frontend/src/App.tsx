import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportForm from './pages/ReportForm';
import ReportList from './pages/ReportList';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/reports" element={<ReportList />} />
      </Routes>
    </Router>
  );
}

export default App;
