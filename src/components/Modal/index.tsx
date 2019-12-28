import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

import Back from 'components/Buttons/Back';

import State from 'models/State';
import Camera from 'screens/Camera';

import {sendCard} from 'actions/CardsAction';

import styles from './styles';

interface IModal {
  state: any;
  setState: any;
}

export default function Modal_({state, setState}: IModal) {
  // const {loadingUpload, setLoadingUpload} = useState({});
  const dispatch = useDispatch();

  let render;
  if (state.camera.loaded) {
    render = <Camera state={state} setState={setState} />;
  } else {
    render = (
      <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
        <Image
          source={{
            uri: `data:image/${state.picture.ext};base64,${state.picture.base64}`,
          }}
          style={styles.modalImage}
        />
        <View style={styles.modalInputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              key="picture"
              style={styles.textInput}
              onChangeText={updateCard}
              placeholder="Informe o nome da imagem"
              value={state.picture.name}
            />
          </View>
          <View style={styles.actionImageButtons}>
            <TouchableOpacity
              onPress={takeCard}
              style={styles.buttonModalContainer}>
              <Text style={styles.buttonCardText}>Tirar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_sendCard}
              style={styles.buttonModalContainer}>
              <Text style={styles.buttonCardText}>Enviar Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Back onPress={closeModal} text={'Fechar'} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <Modal
      visible={state.modal.visible}
      animationType="slide"
      onRequestClose={closeModal}>
      {render}
    </Modal>
  );

  function updateCard(value: string) {
    setState({...state, picture: {...state.picture, name: value}});
  }

  async function _sendCard() {
    await dispatch(sendCard(state.picture));
    setState(new State().setUpdate());
  }

  function takeCard() {
    setState({
      ...state,
      camera: {...state.camera, loaded: true},
    });
  }

  function closeModal() {
    setState({...state, modal: {...state.modal, visible: false}});
  }
}
