import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import { LoadMore } from '../../Lottie';

const screen = Dimensions.get('screen');

function SnyLoading() {
  return (
    <View style={styles.container}>
      <LoadMore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: screen.height / 1.3, width: screen.width },
});

export default SnyLoading;
