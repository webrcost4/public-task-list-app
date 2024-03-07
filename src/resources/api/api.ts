import axios from 'axios'; 

export const Api = axios.create({
    baseURL : 'https://private-task-list-app-backend.vercel.app',
});