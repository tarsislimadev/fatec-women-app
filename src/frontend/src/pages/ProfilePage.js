import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, clearAuth } from '../services/api';
export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => {
            setError('Não foi possível carregar o perfil.');
        })
            .finally(() => setLoading(false));
    }, []);
    function signOut() {
        clearAuth();
        navigate('/');
    }
    if (loading)
        return _jsx("section", { className: "content-card narrow", children: _jsx("p", { className: "muted", children: "Carregando perfil..." }) });
    if (error || !user)
        return (_jsxs("section", { className: "content-card narrow", children: [_jsx("p", { className: "form-error", role: "alert", children: error || 'Usuário não encontrado.' }), _jsx("button", { className: "button ghost", onClick: signOut, children: "Sair da conta" })] }));
    return (_jsxs("section", { className: "content-card narrow", children: [_jsx("span", { className: "eyebrow", children: "Sua conta" }), _jsx("h1", { children: "Meu perfil" }), _jsxs("dl", { className: "profile-details", children: [_jsxs("div", { children: [_jsx("dt", { children: "Nome" }), _jsx("dd", { children: user.name })] }), _jsxs("div", { children: [_jsx("dt", { children: "E-mail" }), _jsx("dd", { children: user.email })] }), _jsxs("div", { children: [_jsx("dt", { children: "Perfil" }), _jsx("dd", { children: user.role })] })] }), _jsxs("div", { className: "actions", children: [_jsx(Link, { className: "button secondary", to: "/reports", children: "Voltar \u00E0s ocorr\u00EAncias" }), _jsx("button", { className: "button ghost", onClick: signOut, children: "Sair da conta" })] })] }));
}
//# sourceMappingURL=ProfilePage.js.map