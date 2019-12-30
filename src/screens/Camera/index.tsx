import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {withNavigationFocus, NavigationFocusInjectedProps} from 'react-navigation';
import { useDispatch } from 'react-redux';
import {RNCamera} from 'react-native-camera';

import {sendCard} from 'actions/CardsAction';

import Card from 'models/Card';

import styles from './styles';

interface ICamera extends NavigationFocusInjectedProps {
  card: Card;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
}

function Camera({card, setCard, isFocused, navigation}: ICamera) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {isFocused && (
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
          captureAudio={false}
        >
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
        </RNCamera>
      )}
    </View>
  );

  async function takePicture(camera: any) {
    const options = {quality: 0.5, base64: true, fixOrientation: true};
    const data = await camera.takePictureAsync(options);

    setCard({...card, base64: data.base64});

    await dispatch(sendCard(card));
    navigation.goBack();
  }

  function PendingView() {
    return (
      <View style={styles.esperando}>
        <Text>Carregando</Text>
      </View>
    );
  }
}

export default withNavigationFocus(Camera);
