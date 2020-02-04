import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import Lottie from 'lottie-react-native';

import {sendCard} from 'actions/CardsAction';

import Card from 'models/Card';
import consts from 'services/consts';
import styles from './styles';
import { setLoading } from 'actions/LoadingAction';
import { getUserCategories } from 'actions/CategoriesAction';
import Reducers from 'models/Reducers';
import User from 'models/User';

export default function Add(props: NavigationInjectedProps) {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);
  
  const [card, setCard] = useState<Card>(new Card());
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  
  return (
    <ScrollView contentContainerStyle={styles.modalContainer}>
      <Image
        source={{
          uri: `data:image/${card.ext};base64,${card.base64}`,
        }}
        style={styles.modalImage}
      />
        <View style={styles.textInputContainer}>
          <TextInput
            key="card"
            style={styles.textInput}
            onChangeText={updateCardName}
            placeholder="Nome da Imagem"
            value={card.name}
          />
        </View>
        <View style={styles.actionImageButtons}>
          <TouchableOpacity
            onPress={addCard}
            style={styles.buttonModalContainer}>
            <Text style={styles.buttonCardCapturar}>Capturar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_sendCard}
            style={styles.buttonModalContainer}>
            <Text style={styles.buttonCardEnviar}>Enviar</Text>
          </TouchableOpacity>
        </View>
        {sendLoading && (<Lottie source={require('assets/animations/loader.json')} autoPlay loop style={styles.loading}/>)}
    </ScrollView>
  );

  function updateCardName(value: string) {
    setCard({...card, name: value});
  }

  async function _sendCard() {
    setSendLoading(true);
    dispatch(setLoading(consts.loading.true));
    await dispatch(sendCard(card));
    await dispatch(getUserCategories(user));
    dispatch(setLoading(consts.loading.false));
    setSendLoading(false);
    props.navigation.navigate(consts.screens.Home);
  }

  function addCard() {
    props.navigation.navigate(consts.screens.Camera, {
      card,
      setCard
    });
  }
}
