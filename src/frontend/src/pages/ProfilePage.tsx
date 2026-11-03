import { Link, useNavigate } from 'react-router-dom';

interface User {
  name?: string;
  email?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') ?? '{}') as User;

  function signOut() {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <section className="content-card narrow">
      <span className="eyebrow">Sua conta</span>
      <h1>Meu perfil</h1>
      <dl className="profile-details">
        <div><dt>Nome</dt><dd>{user.name || 'Não informado'}</dd></div>
        <div><dt>E-mail</dt><dd>{user.email || 'Não informado'}</dd></div>
      </dl>
      <div className="actions">
        <Link className="button secondary" to="/dashboard">Voltar ao painel</Link>
        <button className="button ghost" onClick={signOut}>Sair da conta</button>
      </div>
    </section>
  );
}
