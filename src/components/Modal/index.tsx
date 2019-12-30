import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Keyboard
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  return (
    <Modal
      visible={state.modal.visible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      {state.camera.loaded ? (
        <Camera state={state} setState={setState} />
      ) : (
        // <KeyboardAvoidingView style={styles.modalContainer} behavior="height">
        <View style={styles.modalContainer}>
          <Image
            source={{
              uri: `data:image/${state.picture.ext};base64,${state.picture.base64}`,
            }}
            style={styles.modalImage}
          />
            <View style={styles.textInputContainer}>
              <TextInput
                key="picture"
                style={styles.textInput}
                onChangeText={updateCard}
                placeholder="Nome da Imagem"
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
          {!isKeyboardVisible && (<Back onPress={closeModal} text={'Fechar'} />)}
        </View>
        // </KeyboardAvoidingView>
      )}
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
