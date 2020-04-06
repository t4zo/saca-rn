import _ from 'lodash';
import http from 'services/httpService';
import User from 'models/User';

export async function getAll() {
  return await http.get(`/categories`);
}

export async function getCategoriesFromUser(user: User) {
  return await http.get(`/categories/${user.id}`);
}

export default {
  getAll,
  getCategoriesFromUser
}
