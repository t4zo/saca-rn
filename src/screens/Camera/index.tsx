import React from 'react';
import { useDispatch } from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {RNCamera} from 'react-native-camera';

import {sendCard} from '../../actions/CardsAction';

import Back from '../../components/Buttons/Back';
import styles from './styles';

interface ICamera {
  state: any;
  setState: any;
}

function Camera({state, setState}: ICamera) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
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
                onPress={() => takeCard(camera)}
                style={styles.capture}>
                <Text style={styles.captureText}> CAPTURAR </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
      <Back onPress={handleBackPress} text={'Voltar'} />
    </View>
  );

  async function takeCard(camera: any) {
    const options = {quality: 0.5, base64: true, fixOrientation: true};
    const data = await camera.takePictureAsync(options);

    setState({
      ...state,
      camera: {...state.camera, loaded: false},
      card: {...state.card, base64: data.base64},
    });

    await dispatch(sendCard(state.card));
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
