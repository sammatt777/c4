import axios from "axios";

export const HttpAxios = axios.create({
    baseURL: process.env.API_URL
});
