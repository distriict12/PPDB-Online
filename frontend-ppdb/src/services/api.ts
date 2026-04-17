import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
    baseURL: 'http://localhost:3000'
});

// Axios Interceptor untuk mencegat semua request sebelum dikirim
Api.interceptors.request.use(
    (config) => {
        // Ambil token dari Cookies (atau localStorage jika Kapten menyimpannya di sana)
        const token = Cookies.get('token'); 

        // Jika token ada, otomatis tempelkan di header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;