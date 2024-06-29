import axios from "axios";

const ApiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
    headers: {
        "Content-Type": "application/json",
    }
});

export default ApiService