import axios from "axios"
export const baseApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})