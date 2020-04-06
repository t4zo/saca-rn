import React, { useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import Lottie from 'lottie-react-native';

import styles from './styles';

function Camera() {
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {isFocused && !loading && (
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
            if (status !== 'READY') return <Lottie source={require('assets/animations/loader.json')} autoPlay loop style={styles.loading} />;
            return (
              <View style={styles.camera}>
                <TouchableOpacity
                  onPress={async () => await takePicture(camera)}
                  style={styles.capture}>
                  <Text style={styles.captureText}> CAPTURAR </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
      {loading && (<Lottie source={require('assets/animations/loader.json')} autoPlay loop style={styles.loading} />)}
    </View>
  );

  async function takePicture(camera: any) {
    const options = {quality: 0.5, base64: true, fixOrientation: true};
    const data = await camera.takePictureAsync(options);

    setLoading(true);
    
    const card  = navigation.getParam('card');
    const setCard  = navigation.getParam('setCard');

    setCard({...card, base64: data.base64});

    setLoading(false);

    navigation.goBack();
  }
}

export default Camera;
