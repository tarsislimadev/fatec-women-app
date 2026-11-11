import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getStoredUser } from '../services/api';

export default function AppLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const isLoggedIn = Boolean(user);

  function signOut() {
    clearAuth();
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">Fatec Women</Link>
        <nav className="main-nav" aria-label="Navegação principal">
          {isLoggedIn && <NavLink to="/report">Registrar ocorrência</NavLink>}
          {isLoggedIn && <NavLink to="/reports">Minhas ocorrências</NavLink>}
          {isLoggedIn && <NavLink to="/profile">Meu perfil</NavLink>}
          {!isLoggedIn && <NavLink to="/login">Entrar</NavLink>}
          {!isLoggedIn && <NavLink to="/register">Criar conta</NavLink>}
          {isLoggedIn ? (
            <button className="link-button" onClick={signOut}>Sair</button>
          ) : null}
        </nav>
        {isLoggedIn && <span className="user-chip">{user.name || user.email}</span>}
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">Em caso de emergência, ligue 190.</footer>
    </div>
  );
}
