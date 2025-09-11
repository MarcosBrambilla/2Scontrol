import type { Request, Response } from "express";

import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterBody {
    email: string,
    full_name: string,
    login: string,
    password: string,
}

interface LoginBody {
    login: string,
    password: string,
}

const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    console.log(req.body)
    const { email, full_name, login, password } = req.body;
    try {
        // Extra validation for email, full_name, login and password
        if (!email || !full_name || !login || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { login },
                ],
            },
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Usuário já existe com este email ou Usuário.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: RegisterBody = {
                email,
                login: login.toLowerCase(),
                full_name,
                password: hashedPassword
        }
        const newUser = await prisma.user.create({ data: { ...user } });
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser.login });
    }
    catch (error: unknown) {
        res.status(500).json({ message: 'Erro Interno no servidor ! ', error: error });
    }
};

const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { login, password } = req.body;
    try {
        // extra valiodation for login and password
        if (!login || !password) {
            return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
        }
        // Verify if the user exists and the password is correct
        const user = await prisma.user.findUnique({
            where: {
                login: login.toLowerCase()
            }
        });
        const valid = user && await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Usuário ou Senha não encontrados!' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não definido");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ message: 'Login realizado com sucesso!', token });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Erro ao realizar o login', error: error });
    }
};


const authController = { register, login };
export default authController;
