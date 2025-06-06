import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const register = async (req, res) => {
    const { email, full_name, login, password } = req.body;
    try {
        // Extra validation for email, full_name, login and password
        if (!email || !full_name || !login || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({
             where: {
                [Op.or]: [
                    { email: email },
                    { login: login }
                ]
            } 
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Usuário já existe com este email ou Usuário.' });
        }
        
        // unhash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, full_name, login, password: hashedPassword});
        res.status(201).json({message: 'Usuário registrado com sucesso!', user: newUser});
    }
    catch (error) {
        res.status(500).json({message: 'Erro Interno no servidor ! ', error: error.message});
    }
};

const login = async (req, res) => {
    const { login, password } = req.body;
    try {
    // extra valiodation for login and password
    if (!login || !password) {
        return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
    }
    // Verify if the user exists and the password is correct
    const user = await User.findOne({ where: { login } });
    const valid = user && await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(401).json({ message: 'Usuário ou Senha não encontrados!' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ message: 'Login realizado com sucesso!', token });
} catch (error) {
    res.status(500).json({ message: 'Erro ao realizar o login', error: error.message });
}};


const authController = {register, login};
export default authController;
