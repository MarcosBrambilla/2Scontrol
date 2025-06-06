import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth/';

const register = async ( full_name, email, login , password ) => {
    try{
        console.log(full_name, email, login , password)
        const response = await axios.post(`${API_URL}register`, {
            email,
            full_name,
            login,
            password
        });
        return response.data;        
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const login = async (login, password) => {
    console.log(login)
    try {
        const response = await axios.post(`${API_URL}login`, {
            login,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('userToken', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const logout = () => {
    localStorage.removeItem('userToken');
};

const getCurrentUser = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken ? JSON.parse(userToken) : null;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default authService;