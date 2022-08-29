import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
});

instance.interceptors.response.use((response) => response, (error) => {
    console.log(error)
    throw error;
});

export default instance;