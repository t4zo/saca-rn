import http from 'services/httpService';
import User from 'models/User';
import SignIn from 'models/SignIn';

export async function signIn(user: SignIn) {
  return await http.post(`/auth/signin`, user);  
}

export async function signUp(user: User) {
  return await http.post(`/auth/signup`, user);
}

export async function remove(user: User) {
  return await http.delete(`/auth/delete/${user.id}`);
}

export default {
  signIn,
  signUp,
  remove,
}
