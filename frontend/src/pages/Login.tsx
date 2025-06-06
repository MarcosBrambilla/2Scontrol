import React from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await authService.login( login, password );
      setMessage('Login realizado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setMessage(error || 'Erro ao realizar o login. Verifque suas credenciais.');
    }
  }

  return (
    <div>
        <h1>Realize o Login no sistema</h1>
        <p>Por favor, insira suas credenciais para realizar o login.</p>
        <form onSubmit={handleLogin} className="formLogin">
            <div>
              <label htmlFor="login">Usuário:</label>
              <input 
                type="text" 
                id="login" 
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <div>
                    <a href="/register">Não possui conta?</a>
            </div>
            <button type="submit">Login</button>
        </form>
        {message && <p style={{ color: message.includes('sucesso') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default Login;