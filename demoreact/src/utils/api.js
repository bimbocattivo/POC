import axios from 'axios'

const api = axios.create({
    baseURL: '/api/data',
    headers: {
        'Content-Type': 'multipart/form-data',
      
      }
  });

  export default api;