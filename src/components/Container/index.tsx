import React, {useEffect} from 'react';
import {Image, TouchableHighlight, ScrollView, Alert} from 'react-native';

import {useDispatch} from 'react-redux';
import {removeCard} from 'actions/CardsAction';

import {withNavigation} from 'react-navigation';

import Tts from 'react-native-tts';

import styles from './styles';

import Card from 'models/Card';

interface IContainer {
  cards: Card[];
  state: any;
  setState: any;
}

function Container({cards, state, setState}: IContainer) {
  const dispatch = useDispatch();

  useEffect(() => {
    function InitializeTTS() {
      Tts.setDefaultLanguage('pt-BR');
    }

    InitializeTTS();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.cardsContainer}>
      {cards?.map(card => (
          <TouchableHighlight
            key={card.id}
            onPress={() => Tts.speak(card.name)}
            onLongPress={() => {
              if (card.categoryId === 1) {
                _removeCard(card);
              }
            }}
            delayLongPress={5000}>
            <Image
              source={{
                uri: `data:image/${card.ext};base64,${card.base64}`,
              }}
              style={styles.card}
            />
          </TouchableHighlight>
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
            setState({...state, update: !state.update});
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  }
}

export default withNavigation(Container);
