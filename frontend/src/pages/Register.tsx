import React, { useState } from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
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
        // Validação de e-mail
        if (!validateEmail(email)) {
            setMessage('Por favor, insira um e-mail válido.');
            return;
        }

        try {
            const response = await authService.register( full_name, login, password );
            setMessage(response.data.message || 'Login realizado com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }
            , 2000);
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || 'Erro ao realizar o registro.';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="register">
            <h1>Realize o Registro no sistema</h1>
            <p>Por favor, preencha os campos abaixo para realizar o registro.</p>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleRegister} className="formRegister">
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );

}

export default Register;