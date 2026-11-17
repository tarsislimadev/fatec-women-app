import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return getStoredUser() ? null : _jsx(Navigate, { to: "/login", replace: true });
}
function App() {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(AppLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: requireAuth() ?? _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: requireAuth() ?? _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/report", element: _jsx(ReportForm, {}) }), _jsx(Route, { path: "/reports", element: _jsx(ReportList, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Navigate, { to: "/reports", replace: true }) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) }));
}
export default App;
//# sourceMappingURL=App.js.map