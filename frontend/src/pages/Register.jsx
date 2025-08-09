import React, { useState } from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Regex para validação de e-mail.
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
};

    // Função que envia o registro para o backend quando o formulário é submetido
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        // Validação de e-mail
        if (!validateEmail(email)) {
            setMessage('Por favor, insira um e-mail válido.');
            setLoading(false);
            return;
        }

        try {
            await authService.register( email, full_name, login, password );
            setMessage('Cadastro realizado com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }
            , 2000);
        } catch (error) {
            const errorMsg = error.error || error.message || 'Erro ao realizar o registro.';
            setMessage(errorMsg);
            setLoading(false);
        } 
    };

    return (
        <div>
            <img className='logoLogin'
            src="./Images/Logo2Scontrol.png" alt="Logo do Sistema" />
            <h1>Realize o Registro no sistema</h1>
            <p>Por favor, preencha os campos abaixo para realizar o registro.</p>
            <form onSubmit={handleRegister} className="formLogin">
                <div>
                    <label htmlFor="full_name">Nome Completo:</label>
                    <input type="text" id="full_name" name="full_name" value={full_name} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="login">Usuário:</label>
                    <input type="text" id="login" name="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <a href="/login">Já possui conta?</a>
                </div>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Carregando...' : 'Registrar'}</button>
            </form>
            {message && (<div role="alert" className={message.includes('sucesso') ? 'alert alert-success' : 'alert alert-danger'}> {message} </div>
            )}
        </div>
    );

}

export default Register;