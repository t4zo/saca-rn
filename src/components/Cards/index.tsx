import React from 'react';
import {ScrollView, Alert} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {removeCard} from 'actions/CardsAction';
import { getUserCategories } from 'actions/CategoriesAction';
import _ from 'lodash';

import {withNavigation} from 'react-navigation';

import Reducers from 'models/Reducers';
import Card from 'models/Card';
import User from 'models/User';

import CardComponent from 'components/Cards/Card';

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
            await dispatch(removeCard(card));
            await dispatch(getUserCategories(user));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  }
}

export default withNavigation(Cards);
