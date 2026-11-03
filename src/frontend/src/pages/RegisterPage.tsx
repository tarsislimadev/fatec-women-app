import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ name, email }));
    navigate('/dashboard');
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">Comece com segurança</span>
      <h1>Criar conta</h1>
      <p className="muted">Seus dados ficam protegidos e você decide o que compartilhar.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Senha<input type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary" type="submit">Criar minha conta</button>
      </form>
      <p className="form-help">Já possui uma conta? <Link to="/login">Entrar</Link></p>
    </section>
  );
}
