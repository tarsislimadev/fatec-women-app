import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, clearAuth } from '../services/api';
import type { User } from '../services/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
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

  if (loading) return <section className="content-card narrow"><p className="muted">Carregando perfil...</p></section>;
  if (error || !user) return (
    <section className="content-card narrow">
      <p className="form-error" role="alert">{error || 'Usuário não encontrado.'}</p>
      <button className="button ghost" onClick={signOut}>Sair da conta</button>
    </section>
  );

  return (
    <section className="content-card narrow">
      <span className="eyebrow">Sua conta</span>
      <h1>Meu perfil</h1>
      <dl className="profile-details">
        <div><dt>Nome</dt><dd>{user.name}</dd></div>
        <div><dt>E-mail</dt><dd>{user.email}</dd></div>
        <div><dt>Perfil</dt><dd>{user.role}</dd></div>
      </dl>
      <div className="actions">
        <Link className="button secondary" to="/reports">Voltar às ocorrências</Link>
        <button className="button ghost" onClick={signOut}>Sair da conta</button>
      </div>
    </section>
  );
}
