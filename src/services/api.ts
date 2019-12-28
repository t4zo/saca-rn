import axios from 'axios';

const api = axios.create({
  baseURL: 'https://saca.xyz/saca/api',
});

api.interceptors.request.use(async config => {
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
});

export default api;
