import React from 'react';
import { StyleSheet, Modal as ModalNative, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

const Loading = () => {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: 50,
        height: 50,
      }}
      source={require('../../../assets/animations/load_more_anim.json')}
    />
  );
};

export default class SpinnerV1 extends React.Component {
  render() {
    const { spinning } = this.props;
    if (Platform.OS === 'android')
      return (
        <ModalNative transparent statusBarTranslucent visible={spinning}>
          <View style={styles.container}>
            <Loading />
          </View>
        </ModalNative>
      );

    return (
      <Modal isVisible={spinning} style={styles.container} animationIn="fadeIn" animationOut="fadeOut" backdropTransitionOutTiming={0}>
        <Loading />
      </Modal>
    );
  }
}

SpinnerV1.propTypes = {
  spinning: PropTypes.bool,
};

SpinnerV1.defaultProps = {
  spinning: false,
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
      },
      android: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    }),
  },
});
