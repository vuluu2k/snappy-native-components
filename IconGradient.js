import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import propTypes from 'prop-types';

const IconGradient = props => {
  const component = props.component;
  return (
    <MaskedView
      maskElement={<View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>{component}</View>}>
      <LinearGradient colors={props.colors} style={{ flex: 1 }} start={props.start || { x: 0, y: 0 }} end={props.end || { x: 1, y: 1 }} location={props.location}>
        {component}
      </LinearGradient>
    </MaskedView>
  );
};

export default IconGradient;

IconGradient.propTypes = {
  colors: propTypes.array,
  start: propTypes.object,
  end: propTypes.object,
  location: propTypes.array,
}
