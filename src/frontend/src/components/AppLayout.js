import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getStoredUser } from '../services/api';
export default function AppLayout() {
    const navigate = useNavigate();
    const user = getStoredUser();
    const isLoggedIn = Boolean(user);
    function signOut() {
        clearAuth();
        navigate('/');
    }
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("header", { className: "site-header", children: [_jsx(Link, { className: "brand", to: "/", children: "Fatec Women" }), _jsxs("nav", { className: "main-nav", "aria-label": "Navega\u00E7\u00E3o principal", children: [isLoggedIn && _jsx(NavLink, { to: "/report", children: "Registrar ocorr\u00EAncia" }), isLoggedIn && _jsx(NavLink, { to: "/reports", children: "Minhas ocorr\u00EAncias" }), isLoggedIn && _jsx(NavLink, { to: "/profile", children: "Meu perfil" }), !isLoggedIn && _jsx(NavLink, { to: "/login", children: "Entrar" }), !isLoggedIn && _jsx(NavLink, { to: "/register", children: "Criar conta" }), isLoggedIn ? (_jsx("button", { className: "link-button", onClick: signOut, children: "Sair" })) : null] }), isLoggedIn && _jsx("span", { className: "user-chip", children: user?.name || user?.email })] }), _jsx("main", { className: "page-content", children: _jsx(Outlet, {}) }), _jsx("footer", { className: "site-footer", children: "Em caso de emerg\u00EAncia, ligue 190." })] }));
}
//# sourceMappingURL=AppLayout.js.map