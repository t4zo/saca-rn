import _ from 'lodash';
import http from 'services/httpService';
import Card from 'models/Card';
import User from 'models/User';

export async function createAsync(user: User, card: Card) {
  return await http.post(`/cards/${user.id}`, {
    name: card.name,
    categoryId: 1,
    base64: card.base64,
  });
}

export async function removeAsync(user: User, card: Card) {
  return await http.delete(`/cards/${user.id}/${card.id}`);
}

export default {
  createAsync,
  removeAsync
}
