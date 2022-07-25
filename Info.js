import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Colors from './Colors';

function Info(props) {
  const { onPress, position, children, index, count, total, style, styleContainer } = props;
  return (
    <View style={[styles.container, styles[position], styleContainer]}>
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.button, styles[`button_${position}`], style]}>
        {children || (
          <Text style={styles.text}>
            <FontAwesome name="refresh" size={15} /> {index} - {count} / {total} vận đơn
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

Info.propTypes = {
  position: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Info.defaultProps = {
  position: 'bottomLeft',
};

const styles = StyleSheet.create({
  container: { position: 'absolute' },

  text: {
    fontWeight: '500',
    color: '#fff',
  },
  button: {
    backgroundColor: Colors.logo_snappy,
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_bottomLeft: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  topLeft: {
    top: 20,
    left: 15,
  },
  topRight: {
    top: 20,
    right: 15,
  },
  bottomLeft: {
    bottom: 20,
    left: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 15,
  },
});

export default Info;
