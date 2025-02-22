import axios from 'axios';

const API = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
    baseURL: API,
    timeout: 30000,
});

export default instance;
