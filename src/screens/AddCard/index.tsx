import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-navigation';
// import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import loadingAction from 'actions/LoadingAction';
import categoryAction from 'actions/CategoryAction';
import cardAction from 'actions/CardAction';

import Card from 'models/Card';
import Consts from 'utils/Consts';
import styles from './styles';
import Reducers from 'models/Reducers';
import User from 'models/User';

export default function AddCard() {
  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);
  
  const [card, setCard] = useState<Card>(new Card());
  const [sendLoading, setSendLoading] = useState<boolean>(false);

  //const navigation = useNavigation();
  
  return (
    // <ScrollView contentContainerStyle={styles.modalContainer}>
    <View style={styles.modalContainer}>
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
    </View>
  );

  function updateCardName(value: string) {
    setCard({...card, name: value});
  }

  async function _sendCard() {
    setSendLoading(true);
    dispatch(loadingAction.setLoading(loadingAction.SET_LOADING_TRUE));
    await dispatch(cardAction.send(card));
    await dispatch(categoryAction.getCategoriesFromUser(user));
    dispatch(loadingAction.setLoading(loadingAction.SET_LOADING_FALSE));
    setSendLoading(false);
    //navigation.navigate(Consts.screens.Home);
  }

  function addCard() {
    // navigation.navigate(Consts.screens.Camera, {
    //   card,
    //   setCard
    // });
  }
}
