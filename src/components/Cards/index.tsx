import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import categoryAction from 'actions/CategoryAction';
import cardAction from 'actions/CardAction';
import loadingAction from 'actions/LoadingAction';

import CardComponent from 'components/Cards/Card';

import Reducers from 'models/Reducers';
import Card from 'models/Card';
import User from 'models/User';

import styles from './styles';

interface ICards {
  cards: Card[];
}

function Cards({cards}: ICards) {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);

  return (
    <ScrollView contentContainerStyle={styles.cardsContainer}>
      {cards.map(card => (
        <CardComponent key={card.id} card={card} removeCard={_removeCard} />
      ))}
    </ScrollView>
  );

  function _removeCard(card: Card) {
    Alert.alert(
      'Remover Imagem?',
      'Tem certeza que deseja remover a imagem?',
      [
        {text: 'Não'},
        {
          text: 'Sim',
          onPress: async () => {
            dispatch(loadingAction.setLoading(loadingAction.SET_LOADING_TRUE));
            await dispatch(cardAction.remove(card));
            await dispatch(categoryAction.getCategoriesFromUser(user));
            dispatch(loadingAction.setLoading(loadingAction.SET_LOADING_FALSE));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  }
}

export default Cards;
