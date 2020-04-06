import axios from 'axios';

const http = axios.create({
  // baseURL: 'http://10.0.2.2:5501/saca/api',
  baseURL: 'https://saca.xyz/saca/api',
});

http.interceptors.request.use(async config => {
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
});

export default http;
