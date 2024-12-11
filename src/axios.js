import service from "axios";

export const API_URL = "http://localhost:3000";

const axios = service.create({
   baseURL: `${API_URL}/api`,
   headers: {
      Authorization: localStorage.getItem('token') || null
   }
});

export default axios;