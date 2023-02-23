import axios from "axios";

const entriesApi = axios.create({
    baseURL: '/api',
    timeout: 30000
})

export default entriesApi;