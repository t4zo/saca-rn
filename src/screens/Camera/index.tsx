import React from 'react';
import {Text, TouchableOpacity, View, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import {RNCamera} from 'react-native-camera';

import {sendCard} from 'actions/CardsAction';

import Back from 'components/Buttons/Back';
import styles from './styles';
import {withNavigationFocus} from 'react-navigation';

interface ICamera {
  state: any;
  setState: any;
  isFocused: boolean;
}

function Camera({state, setState, isFocused}: ICamera) {

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {isFocused && (<RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a camera',
          message: 'Precisamos da sua permissão para usar a camera',
          buttonPositive: 'Sim',
          buttonNegative: 'Não',
        }}
        captureAudio={false}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.camera}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={styles.captureText}> CAPTURAR </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>)}
      <Back onPress={handleBackPress} text={'Voltar'} />
    </View>
  );

  async function takePicture(camera: any) {
    const options = {quality: 0.5, base64: true, fixOrientation: true};
    const data = await camera.takePictureAsync(options);

    setState({
      ...state,
      camera: {...state.camera, loaded: false},
      picture: {...state.picture, base64: data.base64},
    });

    await dispatch(sendCard(state.picture));
  }

  function PendingView() {
    return (
      <View style={styles.esperando}>
        <Text>Carregando</Text>
      </View>
    );
  }

  function handleBackPress() {
    setState({
      ...state,
      camera: {...state.camera, loaded: false},
      modal: {...state.modal, visible: true},
    });
  }
}

export default withNavigationFocus(Camera);
