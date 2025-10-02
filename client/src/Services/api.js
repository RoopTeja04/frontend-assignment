import axios from "axios";

const API = axios.create({ baseURL: "https://frontend-assignment-sa3w.onrender.com/api" });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token)
        req.headers.Authorization = `Bearer ${token}`;
    return req;
})

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (data) => API.put("/auth/profile", data);
export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);