import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <span className="eyebrow">Erro 404</span>
      <h1>Página não encontrada</h1>
      <p className="muted">O endereço acessado não existe.</p>
      <Link className="button primary" to="/">Voltar ao início</Link>
    </section>
  );
}
