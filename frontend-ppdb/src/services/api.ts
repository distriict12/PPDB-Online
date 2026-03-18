//import axios
import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    // baseURL: 'https://l67tfv2g-3000.asse.devtunnels.ms/'
    baseURL: 'http://localhost:3000'
})

export default Api
