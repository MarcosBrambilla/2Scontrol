import React from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/button.jsx';
import NavbarDemo from '../components/navbar/index.jsx';

function Home() {
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }
  

  return (
    <>
      <NavbarDemo />
      <Button name="Boa noite" onClick={handleLogout} />
      <div className="Body">
        <h1>Bem-vindo ao 2Scontrol</h1>
        {currentUser ? (
          <div>
            <p>Olá, {currentUser.full_name}!</p>
            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <p>Você não está logado.</p>
        )}
        <p>Adicionar mais rotas abaixo</p>
      </div>
    </>
  );
}

export default Home;