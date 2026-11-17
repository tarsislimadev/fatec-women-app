import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, setAuth } from '../services/api';
export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        setSubmitting(true);
        try {
            const { user, token } = await register({ name, email, phone, password });
            setAuth(token, user);
            navigate('/reports');
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Não foi possível criar a conta.');
        }
        finally {
            setSubmitting(false);
        }
    }
    return (_jsxs("section", { className: "auth-card", children: [_jsx("span", { className: "eyebrow", children: "Comece com seguran\u00E7a" }), _jsx("h1", { children: "Criar conta" }), _jsx("p", { className: "muted", children: "Seus dados ficam protegidos e voc\u00EA decide o que compartilhar." }), _jsxs("form", { className: "form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["Nome", _jsx("input", { value: name, onChange: (event) => setName(event.target.value), required: true })] }), _jsxs("label", { children: ["E-mail", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true })] }), _jsxs("label", { children: ["Telefone", _jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), required: true })] }), _jsxs("label", { children: ["Senha", _jsx("input", { type: "password", minLength: 6, value: password, onChange: (event) => setPassword(event.target.value), required: true })] }), error && _jsx("p", { className: "form-error", role: "alert", children: error }), _jsx("button", { className: "button primary", type: "submit", disabled: submitting, children: submitting ? 'Criando...' : 'Criar minha conta' })] }), _jsxs("p", { className: "form-help", children: ["J\u00E1 possui uma conta? ", _jsx(Link, { to: "/login", children: "Entrar" })] })] }));
}
//# sourceMappingURL=RegisterPage.js.map