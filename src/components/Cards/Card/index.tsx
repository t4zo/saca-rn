import React, { useEffect } from 'react'
import { TouchableHighlight, Image } from 'react-native';
import Tts from 'react-native-tts';

import Card from 'models/Card';

import styles from './styles';

interface ICard {
  card: Card;
  removeCard: (card: Card) => void;
}

function CardComponent({card, removeCard}: ICard) {
  useEffect(() => {
    Tts.setDefaultLanguage('pt-BR');
  }, []);

  return (
    <TouchableHighlight
      key={card.id}
      onPress={() => handleCardPress(card)}
      onLongPress={() => handleCardLongPress(card)}
      delayLongPress={5000}>
      <Image
        source={{
          uri: `data:image/${card.ext};base64,${card.base64}`,
        }}
        style={styles.card}
      />
    </TouchableHighlight>
  )
  
  function handleCardPress(card: Card) {
    Tts.speak(card.name);
  }

  function handleCardLongPress(card: Card) {
    if (card.categoryId === 1) {
      removeCard(card);
    }
  }
}

export default CardComponent;
