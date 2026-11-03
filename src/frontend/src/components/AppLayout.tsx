import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AppLayout() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('user'));

  function signOut() {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">Fatec Women</Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/report">Registrar ocorrência</NavLink>
          {isLoggedIn && <NavLink to="/reports">Minhas ocorrências</NavLink>}
          {isLoggedIn && <NavLink to="/profile">Meu perfil</NavLink>}
          {isLoggedIn ? (
            <button className="link-button" onClick={signOut}>Sair</button>
          ) : (
            <NavLink to="/login">Entrar</NavLink>
          )}
        </nav>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">Em caso de emergência, ligue 190.</footer>
    </div>
  );
}
