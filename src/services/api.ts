import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5501/saca/api',
  // baseURL: 'https://saca.xyz/saca/api',
});

api.interceptors.request.use(async config => {
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
});

export default api;
