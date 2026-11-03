import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createReport } from '../services/api';

export default function ReportForm() {
  const navigate = useNavigate();
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
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
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível enviar o registro.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="content-card form-card">
      <span className="eyebrow">Registro confidencial</span>
      <h1>Registrar ocorrência</h1>
      <p className="muted">Conte apenas o que se sentir confortável em compartilhar. O campo de nome é opcional.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Seu nome (opcional)<input value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label>Link de evidência (opcional)<input type="url" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="https://..." /></label>
        <label>O que aconteceu?<textarea value={details} onChange={(event) => setDetails(event.target.value)} required minLength={10} rows={7} placeholder="Descreva a situação..." /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="actions">
          <Link className="button secondary" to="/">Cancelar</Link>
          <button className="button primary" type="submit" disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar registro'}</button>
        </div>
      </form>
    </section>
  );
}
