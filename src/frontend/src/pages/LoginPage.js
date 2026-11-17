import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, setAuth } from '../services/api';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const { user, token } = await login({ email, password });
            setAuth(token, user);
            navigate('/reports');
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'E-mail ou senha inválidos.');
        }
        finally {
            setSubmitting(false);
        }
    }
    return (_jsxs("section", { className: "auth-card", children: [_jsx("span", { className: "eyebrow", children: "Bem-vinda de volta" }), _jsx("h1", { children: "Entrar" }), _jsxs("form", { className: "form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["E-mail", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true })] }), _jsxs("label", { children: ["Senha", _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true })] }), error && _jsx("p", { className: "form-error", role: "alert", children: error }), _jsx("button", { className: "button primary", type: "submit", disabled: submitting, children: submitting ? 'Entrando...' : 'Entrar' })] }), _jsxs("p", { className: "form-help", children: ["Ainda n\u00E3o possui uma conta? ", _jsx(Link, { to: "/register", children: "Criar conta" })] })] }));
}
//# sourceMappingURL=LoginPage.js.map