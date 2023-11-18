import axios from "axios"

export const request = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
})

// export const axiosPrivate = axios.create({
//   baseURL: process.env.REACT_APP_API_SERVER,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// })