import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
