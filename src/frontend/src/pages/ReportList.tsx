import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getReports } from '../services/api';
import type { Report } from '../services/api';

export default function ReportList() {
  const location = useLocation();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os registros.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="content-card">
      <div className="section-heading">
        <div><span className="eyebrow">Acompanhamento</span><h1>Meus registros</h1></div>
        <Link className="button primary" to="/report">Novo registro</Link>
      </div>
      {location.state?.submitted && <p className="success" role="status">Registro enviado com sucesso.</p>}
      {loading && <p className="muted">Carregando registros...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {!loading && !error && reports.length === 0 && (
        <div className="empty-state"><h2>Nenhum registro ainda</h2><p className="muted">Quando você enviar um registro, ele aparecerá aqui.</p></div>
      )}
      <div className="report-list">
        {reports.map((report) => (
          <article className="report-item" key={report.id}>
            <div className="report-meta"><strong>{report.name || 'Registro anônimo'}</strong><time>{new Date(report.created_at).toLocaleDateString('pt-BR')}</time></div>
            <p>{report.details}</p>
            {report.image_url && <a href={report.image_url} target="_blank" rel="noreferrer">Ver evidência anexada →</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
