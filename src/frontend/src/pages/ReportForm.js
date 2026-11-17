import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createReport } from '../services/api';
export default function ReportForm() {
    const navigate = useNavigate();
    const [details, setDetails] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await createReport({
                details,
                ...(name.trim() ? { name: name.trim() } : {}),
                ...(location.trim() ? { image_url: location.trim() } : {}),
            });
            navigate('/reports', { state: { submitted: true } });
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Não foi possível enviar o registro.');
        }
        finally {
            setSubmitting(false);
        }
    }
    return (_jsxs("section", { className: "content-card form-card", children: [_jsx("span", { className: "eyebrow", children: "Registro confidencial" }), _jsx("h1", { children: "Registrar ocorr\u00EAncia" }), _jsx("p", { className: "muted", children: "Conte apenas o que se sentir confort\u00E1vel em compartilhar. O campo de nome \u00E9 opcional." }), _jsxs("form", { className: "form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["Seu nome (opcional)", _jsx("input", { value: name, onChange: (event) => setName(event.target.value) })] }), _jsxs("label", { children: ["Link de evid\u00EAncia (opcional)", _jsx("input", { type: "url", value: location, onChange: (event) => setLocation(event.target.value), placeholder: "https://..." })] }), _jsxs("label", { children: ["O que aconteceu?", _jsx("textarea", { value: details, onChange: (event) => setDetails(event.target.value), required: true, minLength: 10, rows: 7, placeholder: "Descreva a situa\u00E7\u00E3o..." })] }), error && _jsx("p", { className: "form-error", role: "alert", children: error }), _jsxs("div", { className: "actions", children: [_jsx(Link, { className: "button secondary", to: "/", children: "Cancelar" }), _jsx("button", { className: "button primary", type: "submit", disabled: submitting, children: submitting ? 'Enviando...' : 'Enviar registro' })] })] })] }));
}
//# sourceMappingURL=ReportForm.js.map