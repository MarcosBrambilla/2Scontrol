import React from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };
  return (
    
    <div className="Body">
      <h1>Bem-vindo ao 2Scontrol</h1>
      {currentUser ? (
        <div>
          <p>Olá, {currentUser.full_name}!</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
       ) : (
        <p>Você não está logado. {setTimeout(() => {navigate('/login')}, 2000)}</p>
      )}
      <p>Adicionar mais rotas abaixo</p>

    </div>
  );
}

export default Home;