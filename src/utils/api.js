import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// APIリクエスト例
export const fetchData = async () => {
    try {
        const response = await api.get('/endpoint');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
