import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Acolhimento e proteção</span>
        <h1>Você não está sozinha.</h1>
        <p>Registre uma ocorrência com segurança e acompanhe o atendimento da rede de proteção à mulher.</p>
        <div className="actions">
          <Link className="button primary" to="/report">Registrar ocorrência</Link>
          <Link className="button secondary" to="/login">Acessar minha conta</Link>
        </div>
      </div>
      <aside className="safety-card">
        <strong>Precisa de ajuda agora?</strong>
        <p>Em situação de risco imediato, procure um local seguro e ligue para o 190.</p>
        <Link to="/report">Quero fazer um registro →</Link>
      </aside>
    </section>
  );
}
