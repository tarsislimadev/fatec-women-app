import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getReports } from '../services/api';
export default function ReportList() {
    const location = useLocation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        getReports()
            .then(setReports)
            .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os registros.'))
            .finally(() => setLoading(false));
    }, []);
    return (_jsxs("section", { className: "content-card", children: [_jsxs("div", { className: "section-heading", children: [_jsxs("div", { children: [_jsx("span", { className: "eyebrow", children: "Acompanhamento" }), _jsx("h1", { children: "Meus registros" })] }), _jsx(Link, { className: "button primary", to: "/report", children: "Novo registro" })] }), location.state?.submitted && _jsx("p", { className: "success", role: "status", children: "Registro enviado com sucesso." }), loading && _jsx("p", { className: "muted", children: "Carregando registros..." }), error && _jsx("p", { className: "form-error", role: "alert", children: error }), !loading && !error && reports.length === 0 && (_jsxs("div", { className: "empty-state", children: [_jsx("h2", { children: "Nenhum registro ainda" }), _jsx("p", { className: "muted", children: "Quando voc\u00EA enviar um registro, ele aparecer\u00E1 aqui." })] })), _jsx("div", { className: "report-list", children: reports.map((report) => (_jsxs("article", { className: "report-item", children: [_jsxs("div", { className: "report-meta", children: [_jsx("strong", { children: report.name || 'Registro anônimo' }), _jsx("time", { children: new Date(report.created_at).toLocaleDateString('pt-BR') })] }), _jsx("p", { children: report.details }), report.image_url && _jsx("a", { href: report.image_url, target: "_blank", rel: "noreferrer", children: "Ver evid\u00EAncia anexada \u2192" })] }, report.id))) })] }));
}
//# sourceMappingURL=ReportList.js.map