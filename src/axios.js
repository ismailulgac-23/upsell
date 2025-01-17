import service from "axios";

/* export const API_URL = "http://localhost:3000"; */
export const API_URL = "https://api.lovmeet.com";

export const getImage = (src) => {
   return `${API_URL}/uploads/${src}`
}

const axios = service.create({
   baseURL: API_URL,
   headers: {
      token: localStorage.getItem('token') || null
   }
});

export default axios;